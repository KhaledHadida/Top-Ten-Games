import Header from "../header"
import GameEntry from "../components/gameentry"
import { useEffect, useState } from 'react';
import { getCookie } from '../api/cookiemanage';
import { getGameList } from "../api/gamesapi";



export default function FirstPost() {
  const [gameList, setGameList] = useState([]);

  //Fetch API game list
  useEffect(() => {
    const token = getCookie('userId');
    getGameList(token).then((gameData) => {
      setGameList(gameData);
      console.log(gameData);
    }).catch((error) => {
      console.error('Error:', error);
    })
  }, []); //Only run once when page loads

  return (
    <main className={`min-h-screen flex-col items-center justify-between space-y-4`}>
      {/* Imported header */}
      <Header />
      {/*The game panel */}
      <h1 className="text-center font-bold text-3xl">USERNAME'S top ten games</h1>
      {/* <p>{GameEntry.map(x => <GameEntry name={x.name}/>)}</p> */}
      {gameList.map((game) => (
        <GameEntry id={game._id} name={game.name} reviewDescription={game.reviewDescription} gameCoverURL={game.gameCoverURL} rank={game.rank} gamePicture={game.gameCoverURL} />
      ))}
    </main>
  )
}
