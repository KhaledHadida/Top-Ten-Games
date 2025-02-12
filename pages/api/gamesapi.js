import axios from 'axios';
import { getCookie } from './cookiemanage';


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
        //throw error;
    }

};


//Delete a game from user's list
export const deleteGame = async (gameId) => {
    //Fetch token from cookies
    const token = getCookie('userId');
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


//update a game from user's list
export const updateGame = async (gameId, rank, gameReviewDesc) => {

    const token = getCookie('userId');
    //console.log(`token gameId is ${gameId} ${gameReviewDesc} ${rank}`)
    const data = {
        rank: rank,
        reviewDescription: gameReviewDesc
    }

    try {
        const response = await axios.post(`${backendUrl}/api/gameList/updateGame/${gameId}`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            });
    } catch (error) {
        //resend them to sign in page
        router.push('./signin');
        throw error;

    }
}

//add a game to user's list
export const addGame = async (name, gameReviewDesc) => {
    //If empty return
    if(name == null || name.trim() == ''){
        return;
    }
    const token = getCookie('userId');
    const data = {
        gameName: name,
        reviewDescription: gameReviewDesc
    }
    try {
        const response = await axios.post(`${backendUrl}/api/gameList/addGame`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            });
            return response;
    } catch (error) {
        //Im throwing it here so I can trigger the try-catch in AddGameEntryPanel.js
        throw error;
    }
}

//Get specific user's game list
export const getUserGameList = async (userId) => {
    try {
        const response = await axios.get(`${backendUrl}/api/gameList/fetchGameList/${userId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
    } catch (error) {
        throw error;
    }
}


///BELOW IS API CALLS TO BACKEND FOR GAMES COMPLETED PER USER 

//API call to fetch game list from backend using auth token as param
export const getCompletedGameList = async (token) => {
    //Get a reference to serverless fns 
    //Make the get call
    try {
        const response = await axios.get(`${backendUrl}/api/gamesCompleted/getGameList`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            });
        //Return response
        return response.data.games;
        //Otherwise throw error
    } catch (error) {
        //throw error;
    }

};


//Delete a game from user's list
export const deleteCompletedGame = async (gameId) => {
    //Fetch token from cookies
    const token = getCookie('userId');
    try {
        const response = await axios.post(`${backendUrl}/api/gamesCompleted/deleteGame/${gameId}`, null,
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


//update a game from user's list
export const updateCompletedGame = async (gameId, dateCompleted = null, rating = null, currentlyPlaying = null) => {

    const token = getCookie('userId');

    //Dynamically build it
    const data = {};
    if (dateCompleted !== null) data.dateCompleted = dateCompleted;
    if (rating !== null) data.rating = rating;
    if (currentlyPlaying !== null) data.currentlyPlaying = currentlyPlaying;

    try {
        const response = await axios.post(`${backendUrl}/api/gamesCompleted/updateGame/${gameId}`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            });
    } catch (error) {
        //resend them to sign in page
        router.push('./signin');
        throw error;

    }
}

//add a game to user's list
export const addCompletedGame = async (name, dateCompleted = null, rating = null, currentlyPlaying = null) => {
    //If empty return
    if(name == null || name.trim() == ''){
        return;
    }
    const token = getCookie('userId');

    const data = { gameName: name };
    if (dateCompleted !== null) data.dateCompleted = dateCompleted;
    if (rating !== null) data.rating = rating;
    if (currentlyPlaying !== null) data.currentlyPlaying = currentlyPlaying;


    try {
        const response = await axios.post(`${backendUrl}/api/gamesCompleted/addGame`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            });
            return response;
    } catch (error) {
        //Im throwing it here so I can trigger the try-catch in AddGameEntryPanel.js
        throw error;
    }
}

//Get specific user's game list
export const getUserCompletedGameList = async (userId) => {
    try {
        const response = await axios.get(`${backendUrl}/api/gamesCompleted/fetchGameList/${userId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
    } catch (error) {
        throw error;
    }
}

///BELOW IS API CALLS TO BACKEND FOR FUTURE GAMES PER USER 
//API call to fetch game list from backend using auth token as param
export const getFutureGameList = async (token) => {
    //Get a reference to serverless fns 
    //Make the get call
    try {
        const response = await axios.get(`${backendUrl}/api/futureGames/getGameList`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            });
        //Return response
        return response.data.games;
        //Otherwise throw error
    } catch (error) {
        //throw error;
    }

};


//Delete a game from user's list
export const deleteFutureGame = async (gameId) => {
    //Fetch token from cookies
    const token = getCookie('userId');
    try {
        const response = await axios.post(`${backendUrl}/api/futureGames/deleteGame/${gameId}`, null,
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


//add a game to user's list
export const addFutureGame = async (name) => {
    //If empty return
    if(name == null || name.trim() == ''){
        return;
    }
    const token = getCookie('userId');
    const data = {
        gameName: name,
    }

    try {
        const response = await axios.post(`${backendUrl}/api/futureGames/addGame`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            });
            return response;
    } catch (error) {
        //Im throwing it here so I can trigger the try-catch in AddGameEntryPanel.js
        throw error;
    }
}

//Get specific user's game list
export const getUserFutureGameList = async (userId) => {
    try {
        const response = await axios.get(`${backendUrl}/api/futureGames/fetchGameList/${userId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
    } catch (error) {
        throw error;
    }
}
