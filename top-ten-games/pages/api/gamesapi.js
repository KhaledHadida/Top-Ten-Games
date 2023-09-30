import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

//API call to fetch game list from backend using auth token as param
export const getGameList = async (token) => {
    //Get a reference to serverless fns 

    //Make the get call
    try {
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
    } catch (error) {
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


//Delete a game from user's list
export const deleteGame = async (token, gameId) => {
    console.log(`token is ${token} gameId is ${gameId}`)
    try {
        const response = await axios.post(`${backendUrl}/api/gameList/deleteGame/${gameId}`, null,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            });
    } catch (error) {
        throw error;
    }
}
