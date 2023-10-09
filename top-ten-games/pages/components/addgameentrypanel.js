import { useState } from "react";
import { addGame } from "../api/gamesapi";


export default function AddGameEntryPanel({ showModal, setShowModal, editGame }) {
    //game name
    const [gameName, setGameName] = useState();
    //Game Description
    const [reviewDescription, setReviewDescription] = useState();

    //Handle game name change
    const handleGameNameChange = (e) => {
        setGameName(e.target.value);
    }

    //Handle game review desc  change
    const handleNewReviewDescription = (e) => {
        setReviewDescription(e.target.value);
    }

    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Add a Game Review
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/* Title change */}
                                <div className="flex items-center">
                                    <p className="p-2">Title </p>
                                    <input type="text" onChange={handleGameNameChange} placeholder="Enter title here"
                                        className="block m-2 p-2.5 text-sm w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                {/* Rank change */}
                                {/* <div className="flex items-center justify-between">
                                    <p className="p-2">Rank </p>
                                    <input onChange={handleGameNameChange} type="text" placeholder="Enter rank here"
                                        className="block m-2 p-2.5 text-sm w-1/10 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div> */}
                                {/* Review Description */}
                                <div className="flex justify-between">
                                    <label className="p-2">Review Description </label>
                                    <textarea onChange={handleNewReviewDescription} type="text" placeholder="Enter Review Description here"
                                        className="block m-2 p-2.5 text-sm w-1/10 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        //Close the pop up and updategame with api & add the newest game so we can refresh it on front end
                                        onClick={() => { setShowModal(false); addGame(gameName, reviewDescription).then(()=> editGame()); }}
                                    >
                                        Add Game
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

        </>
    )
}