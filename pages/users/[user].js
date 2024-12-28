import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useLoading } from "../../contexts/loadingcontext";
import LoadingAnimation from "../components/loadinganimation";
import Header from "../header";
import { getUserGameList } from "../api/gamesapi";
import GameEntry from "../components/gameentry";
import { getCookie } from "../api/cookiemanage";
import { checkUserAuth, fetchUsers } from "../api/userapi";
import Profile from "../components/profile";

import Head from 'next/head';

export default function User({ username, gameList }) {

    const router = useRouter();
    //Get what is in query
    const userId = router.query.user;
    //This is for loading purposes which we can toggle
    const { setLoading, loading } = useLoading();

    //For username, profile pic and desc
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [profilePic, setProfilePic] = useState("");


    //Fetch API game list
    useEffect(() => {
        const getProfile = async () => {
            const userProfile = await fetchUsers(username);
            //First search the user up (we fetch first!)
            setName(userProfile[0].name);
            setDesc(userProfile[0].profileBio);
            setProfilePic(userProfile[0].profilePicId);
        }

        getProfile();
    }, []); //Only run once when page loads


    return (

        <main className={`min-h-screen flex-col items-center justify-between`}>
            <Head>
                <title>{name} top ten games</title>
            </Head>
            {/* Imported header */}
            <Header />
            <Profile name={name} description={desc} profilePic={profilePic} myProfile={false} />
            {/*The game panel */}
            {!loading ? (<>
                <h1 className="text-center font-bold text-3xl my-5">{username} top ten games</h1>
                {gameList.length > 0 ? (
                    gameList.map((game) => (
                        <GameEntry key={game._id} id={game._id} name={game.name} reviewDescription={game.reviewDescription} gameCoverURL={game.gameCoverURL} rank={game.rank} gamePicture={game.gameCoverURL} currentProfile={false}
                            onDelete={null} editGame={null} />
                    ))
                ) : (<p className="text-center italic mt-20">Hmm looks like this user has no favourite games..</p>)}
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
    try {
        console.log("reached???");

        const userData = await getUserGameList(user);
        const username = userData.userName;
        const gameList = userData.topGames;

        return {
            props: {
                username,
                gameList,
            },
        };

    } catch (error) {
        console.error("Error fetching user data:", error);

        return {
            notFound: true,
        };
    }

}

