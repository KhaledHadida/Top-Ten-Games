import { getUserGameList } from "../api/gamesapi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { checkUserAuth } from "../api/userapi";
import { getCookie } from "../api/cookiemanage";


export default function UserEntry({ name, id, desc, profilePic }) {
    const router = useRouter();
    //For  profile pic and desc

    //We want to access [user].js 
    const handleUserProfile = () => {
        //Just push it to URL
        router.push('./users/' + id);

    }
    
    return (
        <div className="">
            {/* Image for user */}
            <p hidden>{id}</p>
            <button onClick={handleUserProfile} className='w-[250px] h-[350px] flex flex-col items-center justify-center bg-[#81ACD8] mb-5 rounded-lg overflow-ellipsis'>
                <img className="h-[230px] w-[230px] rounded-full object-fit shadow-lg"  src={`../Images/Profiles/${profilePic}`} alt="No Image"></img>
                <div className="p-2">
                    <p className="text-2xl">{name || "PERSON NAME"}</p>
                    <p className="text-gray-700 overflow-ellipsis overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2
                        }}>
                        {desc}
                    </p>
                </div>
            </button>
        </div>
    )
}