import { setCookie } from './cookiemanage';
import axios from 'axios';

//
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
        setCookie('userId', response.data.token, 1);
    }catch(error){
        throw error;
    }

}
