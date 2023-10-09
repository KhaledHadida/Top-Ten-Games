import Header from "../header";
import GameEntry from "../components/gameentry";
import { useEffect, useState } from 'react';
import { getCookie } from '../api/cookiemanage';
import { getGameList, deleteGame, addGame } from "../api/gamesapi";
import { useRouter } from "next/router";
import AddGameEntryPanel from "../components/addgameentrypanel";

export default function UsersGameList() {
  const [gameList, setGameList] = useState([]);
  const [isLoaded, setIsLoading] = useState(false);

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

  //For modifying
  const [refresh, setRefresh] = useState(false);
  // Function to force a re-render
  const refreshGameList = () => {
    setRefresh(!refresh);
  };


  //Toggle it to true so user can view the page
  const handleLoading = () => {
    console.log("TRUE");
    setIsLoading(true);
  }

  //   useEffect( () => {
  //     console.log(isLoaded);
  // }, [isLoaded]);

  const token = getCookie('userId');
  //Fetch API game list
  useEffect(() => {
    getGameList(token).then((gameData) => {
      setGameList(gameData);
      handleLoading();
      console.log("Data " + gameData);
    }).catch((error) => {
      console.error('Error:', error);
    })
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
      {isLoaded ? (<>
        <h1 className="text-center font-bold text-3xl">USERNAME'S top ten games</h1>
        {gameList.map((game) => (
          console.log("Current Game is below: "),
          console.log(game),
          <GameEntry key={game._id} id={game._id} name={game.name} reviewDescription={game.reviewDescription} gameCoverURL={game.gameCoverURL} rank={game.rank} gamePicture={game.gameCoverURL}
            onDelete={() => handleDeleteGame(game._id)} editGame={refreshGameList}/>
        ))}
        {/* Add a game */}
        <div className="justify-center select-none pb-5 flex">
          <button onClick={() => openAddModal()} className="py-5 px-10 shadow-md no-underline rounded-full bg-blue-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2 text-4xl">+</button>
        </div>
      </>) : "Please login"}
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
