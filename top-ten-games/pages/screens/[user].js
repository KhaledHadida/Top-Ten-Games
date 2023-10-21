import { useRouter } from "next/router";

export default function User() {
    const [gameList, setGameList] = useState([]);
    const [isLoaded, setIsLoading] = useState(false);

    const router = useRouter();
    //Get what is in query
    const userName = router.query.user;

    //This is for loading purposes which we can toggle
    const { setLoading, loading } = useLoading();

    //For add panel
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    //For add
    // Function to add a new game to the gameList state
    const addNewGame = (newGame) => {
        setGameList([...gameList, newGame]);
    };

    //For refreshing the page upon changes (like adding/modifying)
    const [refresh, setRefresh] = useState(false);
    // Function to force a re-render
    const refreshGameList = () => {
        setRefresh(!refresh);
    };


    const token = getCookie('userId');
    //Fetch API game list
    useEffect(() => {
        setLoading(true);
        //First check if user 
        const checkAuthentication = async () => {
            const userAuth = await checkUserAuth(token);
            //If we are denied access.. send them to login page
            if (!userAuth) {
                router.push('./signin');
            } else {
                //If we are authenticated then fetch!
                getGameList(token).then((gameData) => {
                    setGameList(gameData);
                    //OLD Method, prolly remove
                    //handleLoading();
                    console.log("Data " + gameData);
                }).catch((error) => {
                    //console.error('Error:', error);
                }).finally(() => {
                });
            }
            setLoading(false);
        }
        checkAuthentication();
    }, [refresh]); //Only run once when page loads

    return (
        <main className={`min-h-screen flex-col items-center justify-between space-y-4`}>
            {/* Imported header */}
            <Header />
            {/*The game panel */}
            {!loading ? (<>
                <h1 className="text-center font-bold text-3xl">USERNAME'S top ten games</h1>
                {gameList.map((game) => (
                    <GameEntry key={game._id} id={game._id} name={game.name} reviewDescription={game.reviewDescription} gameCoverURL={game.gameCoverURL} rank={game.rank} gamePicture={game.gameCoverURL}
                        onDelete={() => handleDeleteGame(game._id)} editGame={refreshGameList} />
                ))}
                {/* If user is not logged in then display a suggestion to login page */}
            </>) : <LoadingAnimation />
            }
        </main>
    )
}
