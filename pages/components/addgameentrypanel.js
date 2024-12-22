import { useState } from "react";
import { addGame } from "../api/gamesapi";

//Purpose: A panel that appears when a user wants to add a new game to their list
//Params:
//showModal is a bool that controls whether to make the add game panel visible or not
//setShowModal is a bool setter(?) - sets the bool's value
//addNewGame is is the callback function that is passed as a param, in this case it acts as a way to refresh the component (Probably not a great method)
export default function AddGameEntryPanel({ showModal, setShowModal, addNewGame }) {
    //game name
    const [gameName, setGameName] = useState();
    //Game Description
    const [reviewDescription, setReviewDescription] = useState();
    //Error for game existing
    const [error, setError] = useState("");


    //Handle game name change
    const handleGameNameChange = (e) => {
        setGameName(e.target.value);
    }

    //Handle game review desc  change
    const handleNewReviewDescription = (e) => {
        setReviewDescription(e.target.value);
    }

    //If error exists
    const handleAddGame = async () => {
        //Check if game title is blank
        if(gameName == undefined || gameName.trim() == ''){
            setError("Title must not be empty!");
            return;
        }

        try {
            //First 
            await addGame(gameName, reviewDescription).then(() => {
                setShowModal(false);
                //Refresh the entire page to reflect change 
                addNewGame();
            });
        }//otherwise we got an error like 400 
        catch (err) {
            //Get status
            const responseStatus = err.response.status;
            //Error status
            if (responseStatus === 400) {
                const responseMsg = err.response.data.msg;
                setError(responseMsg);
            }
        }
    }
    return (
        // this div is to position and add dark background when toggled
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50  ${showModal ? '' : 'hidden'}`}>
            {/* This div is for  */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 w-2/3 rounded-md">
                <h2 className="text-2xl font-bold mb-4">Add a Game Review</h2>
                <label className="block mb-2">
                    <p className='font-bold'>Title:</p>
                    <input type="text" placeholder="Enter a title here" onChange={handleGameNameChange} className="border rounded-md p-1 w-full" />
                </label>
                <label className="block mb-2">
                    <p className='font-bold'>Review Description:</p>
                    <textarea type="text" placeholder="Enter Review Description here" onChange={handleNewReviewDescription} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </label>
                {/* Save and Cancel */}
                {error && <p className={`text-red-500 font-bold`}>{error}</p>}
                <div className="flex justify-end">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => { handleAddGame(); }}>
                        Add
                    </button>
                    <button className="ml-2 bg-gray-300 px-4 py-2 rounded-md" onClick={() => setShowModal(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}