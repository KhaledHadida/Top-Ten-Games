import { getUserGameList } from "../api/gamesapi";
import { useEffect, useState } from "react";


export default function UserEntry({id, name}) {

    const [gameList, setGameList] = useState([]);

    const handleUserProfile = () =>{
        getUserGameList(id);
    }

    return (
        <div className="flex justify-center">
            {/* Image for user */}
            <p hidden>{id}</p>
            <button className='flex outline outline-2 outline-offset-2 bg-blue-500' style={{ width: '75%', padding: '15px' }}>
                <img className="rounded-full mr-5" style={{ width: 250, height: 250 }} src="../images/witcher.jpg" alt="image description"></img>
                <h1 className="font-semibold">{name || "PERSON NAME"}</h1>
            </button>
        </div>
    )
}