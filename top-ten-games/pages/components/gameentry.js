import { useState } from "react";
import EditGameEntryPanel from "./editgameentrypanel";

export default function GameEntry({ id, name, reviewDescription, rank, gamePicture, onDelete, editGame, currentProfile }) {

  //Current profile is a basic bool that determines whether this is my profile or someone else's (through search)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openModal = () => {
    setIsEditModalOpen(true);
  };

  return (
    <div className="flex items-center">
      <p className="mx-20 text-4xl font-bold">#{rank || "NA"}</p>
      <span hidden>{id}</span>
      <div className="font-mono flex-grow rounded-lg bg-normal-blue mr-24 p-4 shadow-2xl mb-5">
        <div className="flex justify-between relative">
          {/*This flex is to set the picture and description beside each other horizontally*/}
          <div className="w-2/10 flex items-center">
            <img className="mr-5 rounded-lg" style={{ textAlign: "center"}} src={gamePicture} alt="No Image?"></img>
            {/* <div className="grow-0" style={{ overflow: "hidden" }}>
            </div> */}
          </div>
          <div className="w-8/10">
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="">{reviewDescription}</p>
          </div>
          {currentProfile ? (
            <div className="w-1/10 flex justify-end">
              {/* Edit button */}
              <button onClick={openModal} className="h-12 w-24 bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                Edit
              </button>
              {/* X button */}
              <button className="bg-red-500 h-12 w-14 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded-full" onClick={onDelete}>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>) : (null)}
        </div>
      </div>
      {isEditModalOpen && (
        <EditGameEntryPanel
          showModal={isEditModalOpen}
          setShowModal={setIsEditModalOpen}
          id={id}
          name={name}
          reviewDescription={reviewDescription}
          rank={rank}
          gamePicture={gamePicture}
          editGame={editGame}
        />
      )}
      {/* The "are you sure you want to delete" button */}
    </div>
  )

}

