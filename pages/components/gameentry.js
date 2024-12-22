import { useState } from "react";
import EditGameEntryPanel from "./editgameentrypanel";

export default function GameEntry({ id, name, reviewDescription, rank, gamePicture, onDelete, editGame, currentProfile }) {
  //Current profile is a basic bool that determines whether this is my profile or someone else's (through search)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openModal = () => {
    setIsEditModalOpen(true);
  };

  //the different shades (I have tried accessing these dynamically from tailwind.config.js however it does not work)
  //For some reason trying to access a custom color dynamically does not work since it is not recognized (so it's just a random string)
  const shades = [
    '#417FBF', //Darkest
    '#4E88C2',
    '#5B91C7',
    '#689ACC',
    '#74A3D3',
    '#81ACD8',
    '#8EB5DD',
    '#9BBEE2',
    '#A7C7E7',
    '#B3CDEE'  //Lightest
  ];

  return (
    <div className="flex items-center">
      <p className="mx-[2%] text-4xl font-bold">#{rank || "NA"}</p>
      <span hidden>{id}</span>
      {/* FONT HERE This is style below I commented out: min-h-[35vh] max-h-[40vh] overflow-hidden */}
      <div className="font-serif flex-grow rounded-lg mr-24 p-4 mb-5 text-gray-900" style={{ backgroundColor: shades[rank-1]}} >
        <div className="flex flex-col justify-between lg:flex-row relative ">
          {/*This flex is to set the picture and description beside each other horizontally*/}
          <div className="w-full lg:w-2/10 flex items-center">
            <img className="lg:mr-5 mb-5 lg:mb-0 rounded-lg" style={{ textAlign: "center" }} src={gamePicture} alt="No Image?"></img>
            {/* <div className="grow-0" style={{ overflow: "hidden" }}>
            </div> */}
          </div>
          <div className="lg:ml-5 w-8/10 ">
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-slate-700">{reviewDescription}</p>
          </div>
          {currentProfile ? (
            <div className="lg:w-1/10 flex justify-end">
              {/* Edit button */}
              <button onClick={openModal} className="ml-5 h-12 w-24 bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
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

