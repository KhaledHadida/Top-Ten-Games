import Header from "../header";
import GameEntry from "../components/gameentry";
import { useEffect, useState } from 'react';
import { getCookie } from '../api/cookiemanage';
import { getGameList, deleteGame, addGame } from "../api/gamesapi";
//I may just have a separate class for useRouter because it is a commonly used library
import { useRouter } from "next/router";
import AddGameEntryPanel from "../components/addgameentrypanel";
//Loading components
import { useLoading } from "../loadingcontext";
import LoadingAnimation from "../components/loadinganimation";
//Check user auth
import { checkUserAuth } from "../api/userapi";


export default function UsersGameList() {
  const [gameList, setGameList] = useState([]);
  const [isLoaded, setIsLoading] = useState(false);

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


  //Toggle it to true so user can view the page (May remove since we have a global one)
  const handleLoading = () => {
    setIsLoading(true);
  }

  //   useEffect( () => {
  //     console.log(isLoaded);
  // }, [isLoaded]);

  const token = getCookie('userId');
  //Fetch API game list
  useEffect(() => {
    setLoading(true);
    //First check if user 
    const checkAuthentication = async () => {
      const userAuth = await checkUserAuth(token);
      //If we are denied access.. send them to login page
      if (!userAuth) {
        router.push('./signin');
      } else {
        //If we are authenticated then fetch!
        getGameList(token).then((gameData) => {
          setGameList(gameData);
          //OLD Method, prolly remove
          //handleLoading();
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

  return (
    <main className={`min-h-screen flex-col items-center justify-between space-y-4`}>
      {/* Imported header */}
      <Header />
      {/*The game panel */}
      {!loading ? (<>
        <h1 className="text-center font-bold text-3xl">USERNAME'S top ten games</h1>
        {gameList.map((game) => (
          <GameEntry key={game._id} id={game._id} name={game.name} reviewDescription={game.reviewDescription} gameCoverURL={game.gameCoverURL} rank={game.rank} gamePicture={game.gameCoverURL}
            onDelete={() => handleDeleteGame(game._id)} editGame={refreshGameList} />
        ))}
        {/* Add a game */}
        <div className="justify-center select-none pb-5 flex">
          <button onClick={() => openAddModal()} className="py-5 px-10 shadow-md no-underline rounded-full bg-blue-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2 text-4xl">+</button>
        </div>
        {/* If user is not logged in then display a suggestion to login page */}
      </>) : <LoadingAnimation />
      }
      {/* Line below was replacement for the "null" above */}
      {/* <p className="text-center text-4xl">Please <a className="text-blue-600" href="./signin">login</a> to view your list of game reviews</p> */}
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
