//import img

import { useEffect, useState } from "react";
import EditProfilePanel from "./editprofilepanel";

//Get current user's name?

export default function Profile({ name, description, profilePic, refresh, myProfile }) {

    const [profilePicture, setProfilePicture] = useState("");
    //To turn it on or off
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    //Fetch profile pic
    useEffect(() => {
        setProfilePicture(`/Images/Profiles/${profilePic}`);
    }, [profilePic]);

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    return (<>
        <div className="font-serif flex items-stretch shadow-xl relative bg-light-blue">
            <img className="my-5 ml-40 rounded-lg" style={{ width: 250, height: 250, textAlign: "center" }} src={profilePicture} alt="No Image?"></img>
            <div className="m-10">
                <h1 className="text-2xl">Hello <b>{name}</b></h1>
                <p className="">{description}</p>
            </div>
            {myProfile && (
                <button onClick={() => openAddModal()} className="absolute top-5 right-40 h-12 w-34 bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Edit Profile
                </button>
            )
            }
        </div>
        {isAddModalOpen && (
            <EditProfilePanel
                showModal={isAddModalOpen}
                setShowModal={setIsAddModalOpen}
                currentName={name}
                currentDescription={description}
                currentProfilePic={profilePic}
                refresh={refresh}
            />
        )}
    </>)
}