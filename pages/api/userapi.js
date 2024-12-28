import { setCookie, getCookie } from './cookiemanage';
import axios from 'axios';

//login
export const loginUser = async (user, pass) => {
    //Get a reference to serverless fns 
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const data = {
        email: user,
        password: pass
    }
    try{
        const response = await axios.post(`${backendUrl}/api/users/login`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        //Store it in cookie, name it, and let it expire in 1 day.
        const cookieSet = setCookie('userId', response.data.token, 1);
        if(cookieSet){
            return true;
        }else{
            return false;
        }
    }catch(error){
        throw error;
    }
}

//Register user
export const registerUser = async (name, user, pass, picId) => {
    //Get a reference to serverless fns 
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const data = {
        name: name,
        email: user,
        password: pass,
    }
    try{
        const response = await axios.post(`${backendUrl}/api/users/register`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }catch(error){
        throw error;
    }
}

//Update user profile
export const updateUserProfile = async (bio, picId, name) => {
    //Get a reference to serverless fns 
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const token = getCookie('userId');
    const data = {
        bio:  bio,
        picId: picId,
        name: name
    }
    try{
        const response = await axios.post(`${backendUrl}/api/users/updateProfile`, data, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token

            },
        });
    }catch(error){
        throw error;
    }
}

//Fetch users by name 
export const fetchUsers = async (username) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    // const token = getCookie('userId');

    const data = {
        name: username,
    }
    try{
        const response = await axios.post(`${backendUrl}/api/users/fetch`, data, {
            headers: {
                'Content-Type': 'application/json',
                // 'x-auth-token': token
            },
        });
        return response.data.user;
    }catch(error){
        throw error;
    }
}

//Delete user by token 
export const deleteUser = async () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const token = getCookie('userId');

    try{
        const response = await axios.delete(`${backendUrl}/api/users/delete`, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        });
        return response.data;
    }catch(error){
        throw error;
    }
}

//This returns either the response or null
export const checkUserAuth = async (token) => {
    //Note the token from param is always from cookies.
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    //If token is empty
    if(token == ''){
        return;
    }
    try{
        const response = await axios.get(`${backendUrl}/api/auth`, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        });
        return response.data;
    }catch(error){
        return null;
    }

}



