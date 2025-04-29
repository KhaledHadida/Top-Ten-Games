import { useState } from "react";
import { addGame } from "../api/gamesapi";
import Datepicker from "tailwind-datepicker-react";

//Purpose: A panel that appears when a user wants to add a new game to their list
//Params:
//showModal is a bool that controls whether to make the add game panel visible or not
//setShowModal is a bool setter(?) - sets the bool's value
//addNewGame is is the callback function that is passed as a param, in this case it acts as a way to refresh the component (Probably not a great method)
export default function AddCompGamePanel({ showModal, setShowModal, addNewGame }) {
    //game name
    const [gameName, setGameName] = useState();
    //Error for game existing
    const [error, setError] = useState("");

    const [show, setShow] = useState(false);
    const [complete, setComplete] = useState(false);


    //Handle game name change
    const handleGameNameChange = (e) => {
        setGameName(e.target.value);
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
            console.log(gameName);
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
                <h2 className="text-2xl font-bold mb-4">Add a Game</h2>
                <label className="block mb-4">
                    <p className='font-bold'>Title:</p>
                    <input type="text" placeholder="Enter a title here" onChange={handleGameNameChange} className="border rounded-md p-1 w-full" />
                    <p className="italic text-xs">Please ensure the name is accurate to the letter.</p>
                </label>
                <div className="flex items-center mb-4">
                    <input type="checkbox" value="" onClick={() => setComplete(prev => !prev)} className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500 focus:ring-2"/>
                    <label className="ms-2 font-medium text-gray-900">Completed</label>
                </div>

                {complete ? (
                    <>
                        <div className="flex flex-row items-center mb-4">
                            <label className='font-bold'>Date Completed:</label>
                            <div className="w-[200px] ms-2">
                                <Datepicker
                                    show={show}
                                    setShow={setShow}
                                    options={{}}
                                    onChange={(date) => console.log(date)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className='font-bold'>Rating:</label>
                        </div>
                    </>
                ) : null}
                
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