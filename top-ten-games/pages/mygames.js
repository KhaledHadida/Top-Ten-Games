import Header from "./header";
import GameEntry from "./components/gameentry";
import { useEffect, useState } from 'react';
import { getCookie } from './api/cookiemanage';
import { getGameList, deleteGame, addGame } from "./api/gamesapi";
//I may just have a separate class for useRouter because it is a commonly used library
import { useRouter } from "next/router";
import AddGameEntryPanel from "./components/addgameentrypanel";
//Loading components
import { useLoading } from "./contexts/loadingcontext";
import LoadingAnimation from "./components/loadinganimation";
//Check user auth
import { checkUserAuth } from "./api/userapi";
import { useAuth } from "./contexts/authcontext";
//Drag and drop
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


export default function UsersGameList() {
  const [gameList, setGameList] = useState([]);
  const [isLoaded, setIsLoading] = useState(false);
  const { isLoggedIn, login, logout } = useAuth();

  const router = useRouter();

  //This is for loading purposes which we can toggle
  const { setLoading, loading } = useLoading();

  //For add panel
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  //For add
  // Function to add a new game to the gameList state
  const addNewGame = (newGame) => {
    setGameList([...gameList, newGame]);
  };

  //For refreshing the page upon changes (like adding/modifying)
  const [refresh, setRefresh] = useState(false);
  // Function to force a re-render
  const refreshGameList = () => {
    setRefresh(!refresh);
  };


  const token = getCookie('userId');
  //Fetch API game list
  useEffect(() => {
    setLoading(true);
    //First check if user 
    const checkAuthentication = async () => {
      const userAuth = await checkUserAuth(token);
      //If we are denied access.. send them to login page
      if (!userAuth) {
        logout();
        router.push('./signin');
      } else {
        //Login then (may not be best approach but we need it because sessions expire upon tab exit)
        login();
        //If we are authenticated then fetch!
        getGameList(token).then((gameData) => {
          setGameList(gameData);
          console.log("Data " + gameData);
        }).catch((error) => {
          //console.error('Error:', error);
        }).finally(() => {
        });
      }
      setLoading(false);
    }
    checkAuthentication();
  }, [refresh]); //Only run once when page loads

  //Delete game
  const handleDeleteGame = (gameID) => {
    console.log("Deleted game!");
    deleteGame(token, gameID)
      .then(() => {
        // Reload the game list after deletion
        getGameList(token).then((gameData) => {
          setGameList(gameData);
        }).catch((error) => {
          console.error('Error:', error);
        });
      })
      .catch((error) => {
        console.error('Error deleting game:', error);
      });
  };

  //Dragg
  const onDragEnd = (result) => {
    //This arranges it in HTML but does not set it in backend, that's next step
    if (!result.destination) return; 

    const newGameList = [...gameList];
    const [reorderedGame] = newGameList.splice(result.source.index, 1);
    newGameList.splice(result.destination.index, 0, reorderedGame);

    setGameList(newGameList);
  };

  return (
    <main className={`min-h-screen flex-col items-center justify-between space-y-4`}>
      {/* Imported header */}
      <Header />
      <h1 className="text-center font-bold text-3xl">My top ten games</h1>

      {!loading ? (<>



        <DragDropContext onDragEnd={onDragEnd}>
          {/* ... Your existing code ... */}
          <Droppable droppableId="gameList">
            {(provided) => (
              <div ref={provided.innerRef}>
                {gameList.map((game, index) => (
                  <Draggable key={game._id} draggableId={game._id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <GameEntry
                          id={game._id}
                          name={game.name}
                          reviewDescription={game.reviewDescription}
                          gameCoverURL={game.gameCoverURL}
                          rank={game.rank}
                          gamePicture={game.gameCoverURL}
                          currentProfile={true}
                          onDelete={() => handleDeleteGame(game._id)}
                          editGame={refreshGameList}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>


        {/* If user is not logged in then display a suggestion to login page */}
        {/* Center the loading animation */}
      </>) : <div className="h-screen flex items-center justify-center"><LoadingAnimation /></div>
      }

      {/* Add button panel */}
      {isAddModalOpen && (
        <AddGameEntryPanel
          showModal={isAddModalOpen}
          setShowModal={setIsAddModalOpen}
          addNewGame={refreshGameList}
        // id={id}
        // name={name}
        // reviewDescription={reviewDescription}
        // rank={rank}
        // gamePicture={gamePicture}
        />
      )}
    </main>
  )
}

