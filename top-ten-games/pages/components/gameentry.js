import { onDelete } from "../screens/mygames"
import { TriggerEdit } from "./editgameentry"
import EditGameEntry from "./editgameentry"
import { useState } from "react";

export default function GameEntry({ id, name, reviewDescription, rank, gamePicture, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="flex items-center">
      <p className="mx-20 text-2xl">#{rank || "NA"}</p>
      <span hidden>{id}</span>
      <div className="font-mono flex-grow rounded-lg bg-blue-500 mr-24 p-4 shadow-2xl ">
        <div className="flex justify-between">
          {/*This flex is to set the picture and description beside each other horizontally*/}
          <div className="flex">
            <img className="rounded-full mr-5" style={{ width: 250, height: 250 }} src={gamePicture} alt="image description"></img>
            <div className="flex-col">
              <h1 className="text-2xl font-bold">{name}</h1>
              <p>{reviewDescription}</p>
            </div>
          </div>
          <div className="relative h-32 w-32">
            {/* Edit button */}
            <button onClick={() => {openModal}} className="absolute top-0 right-10 h-12 w-24  bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
              Edit
            </button>
            {/* X button */}
            <button className="absolute top-2 right-0" onClick={onDelete}>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <EditGameEntry
          id={id}
          name={name}
          reviewDescription={reviewDescription}
          rank={rank}
          gamePicture={gamePicture}
          onClose={closeModal} // Pass a function to close the modal
        />
      )}
    </div>
  )

}

