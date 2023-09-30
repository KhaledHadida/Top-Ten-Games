import Header from "../header"
import GameEntry from "../components/gameentry"
import { useEffect, useState } from 'react';
import { getCookie } from '../api/cookiemanage';
import { getGameList, deleteGame } from "../api/gamesapi";
import { useRouter } from "next/router";
import EditGameEntry from "../components/editgameentry";


export default function UsersGameList() {
  const [gameList, setGameList] = useState([]);
  const token = getCookie('userId');
  //Fetch API game list
  useEffect(() => {
    getGameList(token).then((gameData) => {
      setGameList(gameData);
      console.log(gameData);
    }).catch((error) => {
      console.error('Error:', error);
    })
  }, []); //Only run once when page loads

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
      <h1 className="text-center font-bold text-3xl">USERNAME'S top ten games</h1>
      {/* <p>{GameEntry.map(x => <GameEntry name={x.name}/>)}</p> */}
      {gameList.map((game) => (
        <GameEntry key={game._id} name={game.name} reviewDescription={game.reviewDescription} gameCoverURL={game.gameCoverURL} rank={game.rank} gamePicture={game.gameCoverURL}
          onDelete={() => handleDeleteGame(game._id)} />
      ))}
      <EditGameEntry />
    </main>
  )
}

//Delete game
// export function DeleteGame(gameID) {
//   console.log("deleted game!");
//   deleteGame(token, gameID);
//   const useRout = useRouter();
//   useRout.push('/screens/mygames');
// }
