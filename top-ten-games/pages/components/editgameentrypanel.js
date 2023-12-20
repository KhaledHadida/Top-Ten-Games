import { useState, useEffect } from "react";
import { updateGame } from "../api/gamesapi";
import { Editor } from '@tinymce/tinymce-react';

export default function EditGameEntryPanel({ showModal, setShowModal, id, name, reviewDescription, rank, gamePicture, editGame }) {

    //Rank
    const [newRank, setNewRank] = useState(rank);

    //Game Description
    const [newReviewDescription, setReviewDescription] = useState(reviewDescription);
    //Handle change
    const handleNewRankChange = (e) => {
        setNewRank(e.target.value);
    }

    // //useeffect
    // useEffect(() => {
    //     // Load TinyMCE script dynamically
    //     const script = document.createElement('script');
    //     script.src = 'https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js';
    //     script.async = true;
    //     script.onload = () => {
    //         // Initialize TinyMCE
    //         tinymce.init({
    //             selector: '#editor',
    //             // Additional configurations specific to this component
    //             // ...
    //         });
    //     };

    //     document.head.appendChild(script);

    //     // Cleanup on component unmount
    //     return () => {
    //         if (tinymce) {
    //             tinymce.remove('#editor');
    //         }
    //     };
    // }, []);

    //Handle  change
    const handleNewReviewDescription = (e) => {
        setReviewDescription(e.target.value);
    }


    return (
        // this div is to position and add dark background when toggled
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50  ${showModal ? '' : 'hidden'}`}>
            {/* This div is for  */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 w-2/3 rounded-md">
                <h2 className="text-2xl font-bold mb-4">Edit Review for {name}</h2>
                <label className="block mb-2">
                    <p className='font-bold'>Rank:</p>
                    <input type="text" placeholder="Enter rank here" defaultValue={rank} onChange={handleNewRankChange} className="border rounded-md p-1 w-full" />
                </label>
                <label className="block mb-2">
                    <p className='font-bold'>Review Description:</p>
                    <textarea type="text" defaultValue={reviewDescription} placeholder="Enter Review Description here" onChange={handleNewReviewDescription} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </label>
                {/* Save and Cancel */}
                <div className="flex justify-end">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => {setShowModal(false); updateGame(id, newRank, newReviewDescription).then(()=> editGame());}}>
                        Save
                    </button>
                    <button className="ml-2 bg-gray-300 px-4 py-2 rounded-md" onClick={() => setShowModal(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}