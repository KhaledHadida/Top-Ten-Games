import { useState } from "react";
import EditGameEntryPanel from "./editgameentrypanel";
import { FaTrophy } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


export default function GameEntry({ id, name, reviewDescription, rank, gamePicture, onDelete, editGame, currentProfile, view }) {
  //Current profile is a basic bool that determines whether this is my profile or someone else's (through search)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: id });

  const openModal = () => {
    setIsEditModalOpen(true);
  };

  //the different shades (I have tried accessing these dynamically from tailwind.config.js however it does not work)
  //For some reason trying to access a custom color dynamically does not work since it is not recognized (so it's just a random string)
  // const shades = [
  //   '#417FBF', //Darkest
  //   '#4E88C2',
  //   '#5B91C7',
  //   '#689ACC',
  //   '#74A3D3',
  //   '#81ACD8',
  //   '#8EB5DD',
  //   '#9BBEE2',
  //   '#A7C7E7',
  //   '#B3CDEE'  //Lightest
  // ];

  const gridStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "180px",
    border: "2px solid black",
    backgroundColor: "#cccccc",
    margin: "10px",
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1
  };

  return (
    //If view is true, list view
    <>
    {view ? (<>
        <div className="flex items-center relative">
        <div className="absolute top-0 left-0 z-10 w-0 h-0 border-t-[100px] border-r-[100px] border-r-transparent border-blue-500">
          {rank === 1 && (
            <p className="absolute bottom-12 left-3 mx-[2%] text-4xl font-bold text-yellow-500 glow"><FaTrophy /></p>
          )}
          {rank === 2 && (
            <p className="absolute bottom-12 left-3 mx-[2%] text-4xl font-bold text-gray-400 glow"><FaTrophy /></p>
          )}
          {rank === 3 && (
            <p className="absolute bottom-12 left-3 mx-[2%] text-4xl font-bold text-orange-700 glow"><FaTrophy /></p>
          )}
          {rank > 3 && (
            <p className="absolute bottom-12 left-3 text-4xl font-bold">{rank || "NA"}</p>
          )}

        </div>
        <span hidden>{id}</span>
        {/* FONT HERE This is style below I commented out: min-h-[35vh] max-h-[40vh] overflow-hidden */}
        <div className="font-serif flex-grow rounded-lg p-4 mb-5 text-gray-900" style={{ backgroundColor: "#87c4ff"}} >
          <div className="flex flex-col justify-between lg:flex-row relative ">
            {/*This flex is to set the picture and description beside each other horizontally*/}
            <div className="w-full lg:w-2/10 flex items-center">
              <img className="lg:mr-5 mb-5 lg:mb-0 rounded-lg" style={{ textAlign: "center" }} src={gamePicture} alt="No Image?"></img>
              {/* <div className="grow-0" style={{ overflow: "hidden" }}>
              </div> */}
            </div>
            <div className="lg:ml-5 w-8/10 ">
              <h1 className="text-2xl font-bold">{name}</h1>
              <p className="text-slate-700">{reviewDescription || <p className="italic text-slate-600">No review description...</p>}</p>
            </div>
            {currentProfile ? (
              <div className="lg:w-1/10 flex justify-end">
                {/* Edit button */}
                <button onClick={openModal} className="ml-5 h-10 w-24 bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-blue-500 rounded flex justify-evenly gap-2 items-center">
                  <FaEdit />Edit
                </button>
                {/* X button */}
                <button className="bg-red-500 h-10 w-12 hover:bg-red-700 text-white font-bold py-2 px-2 ml-2 rounded-full flex justify-center" onClick={onDelete}>
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
      </>): (<>
        <div ref={setNodeRef} {...listeners} {...attributes} style={rank === 3 ? {width:"233px"}: rank === 2 ? {width:"266px"}: rank === 1 ? {width:"350px"} : gridStyle} className="relative flex flex-col items-center justify-end rounded-lg">
          {rank === 1 && (
            <p className="mx-[2%] text-4xl font-bold text-yellow-500"><FaTrophy /></p>
          )}
          {rank === 2 && (
            <p className="mx-[2%] text-4xl font-bold text-gray-400"><FaTrophy /></p>
          )}
          {rank === 3 && (
            <p className="mx-[2%] text-4xl font-bold text-orange-700"><FaTrophy /></p>
          )}
          {rank > 3 && (
            <div className="absolute top-[100%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white z-10 rounded-full w-14 h-14 flex items-center justify-center outline outline-2">
              <p className="text-3xl font-bold">{rank || "NA"}</p>
            </div>
          )}
          <img className="rounded-lg w-full h-auto p-5 bg-[#87c4ff] cursor-grab" src={gamePicture} alt="No Image?">
          </img>
        </div>
      </>)}
    </>
    

  )

}

