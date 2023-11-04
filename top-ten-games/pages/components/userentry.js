import { getUserGameList } from "../api/gamesapi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


export default function UserEntry({ name, id }) {
    const router = useRouter();
    console.log(id);
    console.log("name is " + name);
    //We want to access [user].js 
    const handleUserProfile = () => {
        //This is to get the list
        //getUserGameList(id);
        //WE gotta store userID into session 
        // sessionStorage.setItem('userID', id);

        //Just push it to URL
        router.push('./users/' + id);

    }

    return (
        <div className="flex justify-center">
            {/* Image for user */}
            <p hidden>{id}</p>
            <button onClick={handleUserProfile} className='flex outline outline-2 outline-offset-2 bg-blue-500' style={{ width: '75%', padding: '15px' }}>
                <img className="rounded-full mr-5" style={{ width: 250, height: 250 }} src="../images/witcher.jpg" alt="image description"></img>
                <h1 className="font-semibold">{name || "PERSON NAME"}</h1>
            </button>
        </div>
    )
}