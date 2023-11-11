import Header from "./header";
import GameEntry from "./components/gameentry";
import { useEffect, useState } from 'react';
import { getCookie } from './api/cookiemanage';
import { getGameList, deleteGame, addGame, updateGame } from "./api/gamesapi";
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

//redirecting page
import RedirectPage from "./components/redirectpage";
import Profile from "./components/profile";


export default function UsersGameList() {
  var [gameList, setGameList] = useState([]);

  const [isLoaded, setIsLoading] = useState(false);
  const { isLoggedIn, login, logout } = useAuth();

  //This is for redirecting
  const [redirectBool, setRedirectBool] = useState(false);

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
  // const addNewGame = (newGame) => {
  //   setGameList([...gameList, newGame]);
  // };

  //For refreshing the page upon changes (like adding/modifying)
  const [refresh, setRefresh] = useState(false);
  // Function to force a re-render
  const refreshGameList = () => {
    setRefresh(!refresh);
  };


  const token = getCookie('userId');
  //Fetch API game list
  useEffect(() => {
    //First check if user 
    const checkAuthentication = async () => {
      setLoading(true);
      const userAuth = await checkUserAuth(token);
      //If we are denied access.. send them to login page
      if (!userAuth) {
        logout();
        setLoading(false);
        router.push('./signin');
      } else {
        //Login then (may not be best approach but we need it because sessions expire upon tab exit)
        login();
        //If we are authenticated then fetch!
        getGameList(token).then((gameData) => {
          setGameList(gameData);
        }).catch((error) => {
          //console.error('Error:', error);
          //Error send them to signin page
          router.push('./signin');
        })
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

  //HandleChange
  useEffect(() => {
    console.log("Game list updated:", gameList);
    // Perform any additional actions here
  }, [gameList]);

  // Define the onDragEnd function
  const onDragEnd = async (result) => {
    // This arranges it in HTML but does not set it in the backend; that's the next step
    if (!result.destination) return;

    const newGameList = [...gameList];
    const [reorderedGame] = newGameList.splice(result.source.index, 1);
    newGameList.splice(result.destination.index, 0, reorderedGame);
    //Set it locally (Frontend only)
    setGameList(newGameList);

    //Update backend
    for (let index = 0; index < newGameList.length; index++) {
      const newRank = index + 1;
      console.log("Game is " + gameList[index].name + " and rank is  " + newRank);

      //This is probably not best method of doing it but whenever user is afk (I may need a better approach)
      try {
        await updateGame(newGameList[index]._id, newRank, newGameList[index].reviewDescription);
      } catch (error) {
        //Show them the redirecting first
        setRedirectBool(true);
      }
    }

    // Set the current copy of game list
    console.log('Before state update:', gameList);
    console.log('After state update:', newGameList);

    //Fetch stuff from backend to frontend??? Definitely not best practice.
    // await getGameList(token).then((data) => {
    //   // Set the current copy of game list
    //   setGameList(data);
    // })
  };


  return (
    <main className={`min-h-screen flex-col items-center justify-between space-y-4`}>
      {/* Imported header */}
      <Header />
      <Profile/>
      {redirectBool ? (<RedirectPage text={"Seems like your session has expired.. Redirecting you to sign page!"} />
      ) : (!loading ? (<>
        <h1 className="text-center font-bold text-3xl">My top ten games</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          {/* ... Your existing code ... */}
          <Droppable droppableId="gameList">
            {(provided) => (
              <div ref={provided.innerRef}>
                {gameList.map((game, index) => (
                  <Draggable key={game._id} draggableId={game._id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mt-3">
                        <GameEntry
                          key={game._id}
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
        {/* add button */}
        <div className="justify-center select-none pb-5 flex">
          <button onClick={() => openAddModal()} className="py-5 px-10 shadow-md no-underline rounded-full bg-blue-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2 text-4xl">+</button>
        </div>
      </>) : <div className="h-screen flex items-center justify-center"><LoadingAnimation /></div>
      )}

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

