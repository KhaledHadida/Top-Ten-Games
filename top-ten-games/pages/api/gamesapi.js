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
        throw error;
    }

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


//update a game from user's list
export const updateGame = async (gameId, rank, gameReviewDesc) => {
    const token = getCookie('userId');
    console.log(`token gameId is ${gameId} ${gameReviewDesc} ${rank}`)
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
    console.log(`game is ${gameReviewDesc} ${name}`)
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
            console.log(response);
            return response;
    } catch (error) {
        throw error;
    }
}

//Get specific user's game list
export const getUserGameList = async (userId) => {
    console.log("RESPONSE " + response);
    try {
        const response = await axios.post(`${backendUrl}/api/gameList/fetchGameList/${userId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
    } catch (error) {
        throw error;
    }
}

