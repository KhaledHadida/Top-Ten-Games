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
export const registerUser = async (name, user, pass) => {
    //Get a reference to serverless fns 
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const data = {
        name: name,
        email: user,
        password: pass
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

//Fetch users by name 
export const fetchUsers = async (username) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const token = getCookie('userId');

    const data = {
        name: username,
    }
    try{
        const response = await axios.post(`${backendUrl}/api/users/fetch`, data, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        });
        return response.data.user;
    }catch(error){
        throw error;
    }
}

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
        return true;
    }catch(error){
        return false;
    }

}

