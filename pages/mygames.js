import Header from "./header";
import GameEntry from "./components/gameentry";
import { useEffect, useState } from 'react';
import { getCookie } from './api/cookiemanage';
import { getGameList, deleteGame, addGame, updateGame, getCompletedGameList } from "./api/gamesapi";
//I may just have a separate class for useRouter because it is a commonly used library
import { useRouter } from "next/router";
import AddGameEntryPanel from "./components/addgameentrypanel";
import AddCompGamePanel from "./components/addcompgamepanel";
//Loading components
import { useLoading } from "../contexts/loadingcontext";
import LoadingAnimation from "./components/loadinganimation";
//Check user auth
import { checkUserAuth } from "./api/userapi";
import { useAuth } from "../contexts/authcontext";
//Drag and drop
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy
} from "@dnd-kit/sortable";
import { Box } from "grommet";

//redirecting page
import RedirectPage from "./components/redirectpage";
import Profile from "./components/profile";
import DeletePanel from "./components/deletepanel";

import Head from 'next/head';

import { IoGridOutline } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";




export default function UsersGameList() {
  var [gameList, setGameList] = useState([]);
  var [cGameList, setCGameList] = useState([]);

  const [isLoaded, setIsLoading] = useState(false);
  const { isLoggedIn, login, logout } = useAuth();
  const [isListView, setIsListView] = useState(true);
  const [activeId, setActiveId] = useState(null);

  //This is for redirecting
  const [redirectBool, setRedirectBool] = useState(false);

  const router = useRouter();

  //This is for loading purposes which we can toggle
  const { setLoading, loading } = useLoading();

  //For add panel
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  //For delete panel
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  //For username, profile pic and desc
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [profilePic, setProfilePic] = useState("");

  //This is to store the current game that is about to be deleted (Not sure if this is best practice)
  const [currentGameId, setCurrentGameId] = useState(null);

  //For refreshing the page upon changes (like adding/modifying)
  const [refresh, setRefresh] = useState(false);
  // Function to force a re-render
  const refreshGameList = () => {
    setRefresh(!refresh);
  };


  const token = getCookie('userId');
  //Fetch API game list
  useEffect(() => {
    //First check if user 
    const checkAuthentication = async () => {
      setLoading(true);
      const userAuth = await checkUserAuth(token);
      //If we are denied access.. send them to login page
      if (userAuth == null) {
        logout();
        setLoading(false);
        router.push('./signin');
      } else {
        //Login then (may not be best approach but we need it because sessions expire upon tab exit)
        login();
        //If we are authenticated then fetch!
        getGameList(token).then((gameData) => {
          setGameList(gameData);
          setIsListView(false);
        }).catch((error) => {
          //console.error('Error:', error);
          //Error send them to signin page
          router.push('./signin');
        })

        getCompletedGameList(token).then((gameData) => {
          console.log(cGameList);
          setCGameList(gameData);
        }).catch((error) => {
          router.push('/signin');
        })

        //Get current user name and desc and profile
        //First search the user up
        setName(userAuth.name);
        setDesc(userAuth.profileBio);
        setProfilePic(userAuth.profilePicId);
      }
      setLoading(false);

    }
    checkAuthentication();
  }, [refresh]); //Only run once when page loads

  


  useEffect(() => {
    //Here we update the backend
    const updateGames = async () => {
      try {
        for (let index = 0; index < gameList.length; index++) {
          const newRank = index + 1;
          // This is probably not the best method, but it's okay for now
          await updateGame(gameList[index]._id, newRank, gameList[index].reviewDescription);
        }
      } catch (error) {
        console.error('Error updating games:', error);
      }
    };

    updateGames();
  }, [gameList, cGameList]);

  //Delete game
  const handleDeleteGame = (gameID) => {
    deleteGame(gameID)
      .then(() => {
        // Reload the game list after deletion
        getGameList(token).then((gameData) => {
          setGameList(gameData);
        }).catch((error) => {
          console.error('Error:', error);
        });
      })
      .catch((error) => {
        console.error('Error deleting game:', error);
      });
  };

  // Define the onDragEnd function
  const onDragEnd = async (result) => {
    // This arranges it in HTML but does not set it in the backend; that's the next step
    if (!result.destination) return;

    const newGameList = [...gameList];
    const [reorderedGame] = newGameList.splice(result.source.index, 1);
    newGameList.splice(result.destination.index, 0, reorderedGame);

    //Update frontend component (what user sees immediately)
    for (let index = 0; index < newGameList.length; index++) {
      const newRank = index + 1;
      console.log("Game is " + gameList[index].name + " and rank is  " + newRank);
      newGameList[index].rank = newRank;
    }
    //Set it locally (Frontend only)
    setGameList(newGameList);

  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return; 

    if (active.id !== over.id) {
      setGameList((gameList) => {
        const oldIndex = gameList.findIndex((game) => {
          return game._id === active.id;
        });
        const newIndex = gameList.findIndex((game) => {
          return game._id === over.id});

    
        if (oldIndex === -1 || newIndex === -1) return gameList;
    
        // Create a new array to ensure state updates
        const updatedList = [...gameList];
        
        // Remove item from old position and insert at new position
        const [movedItem] = updatedList.splice(oldIndex, 1);
        updatedList.splice(newIndex, 0, movedItem);
        for (let index = 0; index < updatedList.length; index++) {
          const newRank = index + 1;
          updatedList[index].rank = newRank;
        }
        setGameList(updatedList)
        return updatedList;
      });
    }
  };

  const findRank = (activeId) => {
    const index = gameList.findIndex((game) => {
      return game._id === activeId;
    });
    return gameList[index].rank
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const [tabIndex, setTabIndex] = useState(0);


  return (
    <main className="min-h-screen">
      {/* Imported header */}
      <Header />
      <Head>
        <title>My Games</title>
      </Head>
      {redirectBool ? (<RedirectPage text={"Seems like your session has expired.. Redirecting you to sign page!"} />
      ) : (!loading ? (<>
        <Profile name={name} description={desc} profilePic={profilePic} refresh={refreshGameList} myProfile={true} />
      <div className="mx-32">
        <div className="flex flex-row gap-10 mt-5">
          <button 
            onClick={() => setTabIndex(0)}>
              Top 10 Games
          </button>
          <button
            onClick={() => setTabIndex(1)}>
              Completed Games
          </button>
          <button 
            onClick={() => setTabIndex(2)}>
              Future Games
          </button>
        </div>

        {/* Top 10 games tab */}
        {tabIndex === 0 && (
          <div>
            <div className="py-2.5 flex flex-row justify-between items-center">
              <h1 className="font-serif font-bold text-3xl">My Top Ten Games</h1>
              <div className="flex flex-row">
                <button 
                  onClick={() => setIsListView(false)}
                  className={isListView ? "py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" : 
                  "py-2.5 px-5 me-2 text-sm font-medium focus:outline-none rounded-full border border-gray-200 bg-gray-100 text-blue-700 focus:z-10"}>
                  <IoGridOutline size={25}/>
                </button>
                <button 
                  onClick={() => {
                    console.log(gameList)
                    setIsListView(true)}}
                  className={!isListView ?"py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700":
                  "py-2.5 px-5 me-2 text-sm font-medium focus:outline-none rounded-full border border-gray-200 bg-gray-100 text-blue-700 focus:z-10"
                  }>
                  <CiBoxList size={25}/>
                </button>
              </div>
            </div>
            {gameList.length > 0 && (
              <>{isListView ? (
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="gameList">
                    {(provided) => (
                      <div className="w-full" ref={provided.innerRef}>
                        {gameList.map((game, index) => (
                          <Draggable key={game._id} draggableId={game._id} index={index}>
                            {(provided) => (
                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="p-2">
                                <GameEntry
                                  key={game._id}
                                  id={game._id}
                                  name={game.name}
                                  reviewDescription={game.reviewDescription}
                                  gameCoverURL={game.gameCoverURL}
                                  rank={game.rank}
                                  gamePicture={game.gameCoverURL}
                                  currentProfile={true}
                                  view={isListView}
                                  onDelete={() => {
                                    setCurrentGameId(game._id);
                                    openDeleteModal();
                                  }}
                                  // onDelete={() => handleDeleteGame(game._id)}
                                  editGame={refreshGameList}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              ) : 
              (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                  onDragStart={handleDragStart}>
                  <Box flex={true} wrap={true} direction="row" className="rounded-lg max-w-xl justify-center mb-10 py-10 bg-gray-200">
                    <SortableContext items={gameList} strategy={rectSortingStrategy}>
                      <Box direction="row" wrap={true} justify="center" gap="small">
                        {gameList.length === 1 ? (
                          <GameEntry
                            key={gameList[0]._id}
                            id={gameList[0]._id}
                            name={gameList[0].name}
                            reviewDescription={gameList[0].reviewDescription}
                            gameCoverURL={gameList[0].gameCoverURL}
                            rank={gameList[0].rank}
                            gamePicture={gameList[0].gameCoverURL}
                            currentProfile={true}
                            view={isListView}
                            onDelete={() => {
                              setCurrentGameId(gameList[0]._id);
                              openDeleteModal();
                            }}
                            editGame={refreshGameList}
                          />

                        ) : gameList.length === 2 ? (
                          [gameList[1],gameList[0]].map((game) => (
                            <GameEntry
                              key={game._id}
                              id={game._id}
                              name={game.name}
                              reviewDescription={game.reviewDescription}
                              gameCoverURL={game.gameCoverURL}
                              rank={game.rank}
                              gamePicture={game.gameCoverURL}
                              currentProfile={true}
                              view={isListView}
                              onDelete={() => {
                                setCurrentGameId(game._id);
                                openDeleteModal();
                              }}
                              editGame={refreshGameList}
                            />
                          ))
                        ) : gameList.length === 3 ? (
                          [gameList[1],gameList[0],gameList[2]].map((game) => (
                            <GameEntry
                              key={game._id}
                              id={game._id}
                              name={game.name}
                              reviewDescription={game.reviewDescription}
                              gameCoverURL={game.gameCoverURL}
                              rank={game.rank}
                              gamePicture={game.gameCoverURL}
                              currentProfile={true}
                              view={isListView}
                              onDelete={() => {
                                setCurrentGameId(game._id);
                                openDeleteModal();
                              }}
                              editGame={refreshGameList}
                            />
                          ))
                        ) : null}

                        
                      </Box>

                      {/* Remaining 7 Items */}
                      <Box direction="row" wrap={true} justify="center" gap="small">
                        {gameList.slice(3).map((game) => (
                          <GameEntry
                            key={game._id}
                            id={game._id}
                            name={game.name}
                            reviewDescription={game.reviewDescription}
                            gameCoverURL={game.gameCoverURL}
                            rank={game.rank}
                            gamePicture={game.gameCoverURL}
                            currentProfile={true}
                            view={isListView}
                            onDelete={() => {
                              setCurrentGameId(game._id);
                              openDeleteModal();
                            }}
                            editGame={refreshGameList}
                          />
                        ))}
                      </Box>
                      <DragOverlay>
                        {activeId ? (
                          <div
                            className="rounded-lg cursor-grabbing"
                            onClick={() => findRank(activeId)}
                            style={{
                              width: findRank(activeId) === 1 ? "350px" : findRank(activeId) === 2 ? "266px": findRank(activeId) === 3 ? "233px": "176px",
                              height: findRank(activeId) === 1 ? "453px" : findRank(activeId) === 2 ? "341px": findRank(activeId) === 3 ? "297px": "222px",
                              backgroundColor: "#87c4ff",
                              opacity: 0.5,
                              position: "absolute",
                              top:findRank(activeId) === 1 ? 35 : findRank(activeId) === 2 ? 145: findRank(activeId) === 3 ? 190: 0
                            }}
                          ></div>
                        ) : null}
                      </DragOverlay>
                    </SortableContext>
                  </Box>
                </DndContext>
              )}</>
            )}
            

          {/* If user is not logged in then display a suggestion to login page */}
          {/* add button */}
          {gameList.length < 10 && (
            <div className="justify-center select-none pb-5 flex">
              <button onClick={() => openAddModal()} className="py-5 px-10 shadow-md no-underline rounded-full bg-green-500 text-white font-semibold border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2 text-4xl">+</button>
            </div>
          )}
          </div>
          
        )}


        {tabIndex === 1 && (
          <div>
            <h1 className="font-serif font-bold text-3xl py-2.5">My Top Ten Games</h1>
            {cGameList.map((game,index) => (
              <div>{game}</div>
            ))}
            <div className="justify-center select-none pb-5 flex">
              <button onClick={() => openAddModal()} className="py-5 px-10 shadow-md no-underline rounded-full bg-green-500 text-white font-semibold border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2 text-4xl">+</button>
            </div>
          </div>
        )}

      </div>
        

        
        
      </>) : <div className="h-screen flex items-center justify-center"><LoadingAnimation /></div>
      )}

      {/* Add button panel */}
      {/* Top games add */}
      {isAddModalOpen && tabIndex === 0 && (
          <AddGameEntryPanel
            showModal={isAddModalOpen}
            setShowModal={setIsAddModalOpen}
            addNewGame={refreshGameList}
          />
      )}
      {/* Completed games add */}
      {isAddModalOpen && tabIndex === 1 && (
        <AddCompGamePanel
          showModal={isAddModalOpen}
          setShowModal={setIsAddModalOpen}
          addNewGame={refreshGameList}
        />
      )}

      {/* Delete button panel */}
      {isDeleteModalOpen && (
        <DeletePanel
          showModal={isDeleteModalOpen}
          setShowModal={setIsDeleteModalOpen}
          title={"Game"}
          description={"Are you sure you want to delete game's review?"}
          deleteThis={() => handleDeleteGame(currentGameId)}
        />
      )}
    </main>
  )
}

