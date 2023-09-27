import axios from 'axios';

//API call to fetch game list from backend using auth token as param
export const getGameList = async (token) => {
    //Get a reference to serverless fns 
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    //Make the get call
    try{
    const response = await axios.get(`${backendUrl}/api/gameList/getGameList`,
        {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        });
        //Return response
        return response.data.topGames;
        //Otherwise throw error
    }catch (error){
        throw error;
    }

    //OLDDD
    // axios.get(`${backendUrl}/api/gameList/getGameList`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-auth-token': token,
    //   },
    // })
    //   .then((response) => {
    //     const gameData = response.data.topGames;
    //     setGameList(gameData);
    //     console.log(response.data.topGames);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
};
