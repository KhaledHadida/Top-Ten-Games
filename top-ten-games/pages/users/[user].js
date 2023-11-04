import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useLoading } from "../contexts/loadingcontext";
import LoadingAnimation from "../components/loadinganimation";
import Header from "../header";
import { getUserGameList } from "../api/gamesapi";
import GameEntry from "../components/gameentry";

export default function User({username, gameList}) {
    // const [gameList, setGameList] = useState([]);
    const [isLoaded, setIsLoading] = useState(false);

    const router = useRouter();
    //Get what is in query
    const userId = router.query.user;
    console.log("OK " + userId);
    //This is for loading purposes which we can toggle
    const { setLoading, loading } = useLoading();


    // //Fetch API game list
    // useEffect(() => {
    //     console.log("hey");

    //     //If we are authenticated then fetch!
    //     getUserGameList(userId).then((gameData) => {
    //         setGameList(gameData);
    //         //OLD Method, prolly remove
    //         //handleLoading();
    //         console.log("Data " + gameData);
    //     }).catch((error) => {
    //         //console.error('Error:', error);
    //     }).finally(() => {
    //     });

    // }, []); //Only run once when page loads

    return (
        <main className={`min-h-screen flex-col items-center justify-between space-y-4`}>
            {/* Imported header */}
            <Header />
            {/*The game panel */}
            {!loading ? (<>
                <h1 className="text-center font-bold text-3xl">{username}'s top ten games</h1>
                {gameList.map((game) => (
                    <GameEntry key={game._id} id={game._id} name={game.name} reviewDescription={game.reviewDescription} gameCoverURL={game.gameCoverURL} rank={game.rank} gamePicture={game.gameCoverURL} currentProfile={false}
                        onDelete={null} editGame={null} />
                ))}
                <p></p>
                {/* If user is not logged in then display a suggestion to login page */}
            </>) : <LoadingAnimation />
            }
        </main>
    )
}

export async function getServerSideProps(context) {
    const { query } = context;
    const user = query.user;

    // Fetch game data based on user
    const userData = await getUserGameList(user);
    const username = userData.userName;
    const gameList = userData.topGames;
    return {
      props: {
        username,
        gameList,
      },
    };
  }

  