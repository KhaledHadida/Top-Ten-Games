import { getUserGameList } from "../api/gamesapi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { checkUserAuth } from "../api/userapi";
import { getCookie } from "../api/cookiemanage";


export default function UserEntry({ name, id, desc, profilePic }) {
    const router = useRouter();
    console.log(id);
    console.log("name is " + desc);

    //For  profile pic and desc

    //We want to access [user].js 
    const handleUserProfile = () => {
        //This is to get the list
        //getUserGameList(id);
        //WE gotta store userID into session 
        // sessionStorage.setItem('userID', id);

        //Just push it to URL
        router.push('./users/' + id);

    }

    // const token = getCookie('userId');
    
    // //Get profile pic and desc
    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         const userAuth = await checkUserAuth(token);

    //     };


    //     fetchUserData();
    // }, []);

    return (
        <div className="flex justify-center">
            {/* Image for user */}
            <p hidden>{id}</p>
            <button onClick={handleUserProfile} className='flex outline outline-2 outline-offset-2 bg-blue-500' style={{ width: '75%', padding: '15px' }}>
                <img className="mr-5" style={{ width: 250, height: 250 }} src={`../Images/Profiles/${profilePic}`} alt="No Image"></img>
                <div className="flex flex-col items-start">
                    <h1 className="font-semibold">{name || "PERSON NAME"}</h1>
                    <p>{desc}</p>
                </div>
            </button>
        </div>
    )
}