import axios from 'axios';
import { useEffect, useState } from 'react';
import { loginUser } from './api/userapi';
import { useAuth } from './authcontext';
import { deleteCookie } from './api/cookiemanage';
import { useRouter } from 'next/router';


export default function Header() {
    const [data, setData] = useState({});
    //So we can track if user is logged in or not
    const { fetchLoginStatus, isLoggedIn, login, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchStatus = async () => {
            // Fetch the login status
            const status = fetchLoginStatus();
            console.log("Set " + status);
        }
        //Check if user is logged in or not. 

        fetchStatus();
    }, []); // 


    //logout
    const handleLogout = async () => {
        try {
            // Perform login logic here
            await logout();
            console.log("Logout");
            //Delete cookie
            deleteCookie("userId");
            // If login is successful, navigate to the "mygames" page
            router.push('./signin'); // Replace '/mygames' with the actual path of your "mygames" page
        } catch (error) {
            // Handle login failure
            console.error('Logout failure:', error);
        }
    };

    return (
        <header>
            <ul className="flex items-center justify-between bg-red-400">
                <h1 className="font-extrabold pl-10 py-2" style={{ fontSize: 25 }}>Top Ten Games</h1>
                <li className="mr-6">
                    <a className="text-blue-500 hover:text-blue-800" href="users">Users</a>
                </li>
                <li className="mr-6">
                    <a className="text-blue-500 hover:text-blue-800" href="mygames">My Games</a>
                </li>
                {isLoggedIn ? (<li className="mr-6">
                    <button className="text-blue-500 hover:text-blue-800" onClick={ handleLogout}>Sign Out</button>
                </li>) :
                    (<li className="mr-6">
                        <a className="text-blue-500 hover:text-blue-800" href="signin">Sign In</a>
                    </li>)}
                {/* onClick={handleSignIn} */}
            </ul>
        </header>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
        }
    }
}



//Move this to a separate API file under the api folder (because we should keep api calls separate from front end)
function handleSignIn() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const email = 'khaled@example.com';
    const password = '123456';

    //Login the user.
    loginUser(email, password);

    //OLDDDD
    // axios.post(`${backendUrl}/api/users/login`, data, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })
    //     .then((response) => {
    //         console.log(response.data.token);
    //         //Store it in cookie, name it, and let it expire in 1 day.
    //         setCookie('userId', response.data.token, 1);
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });
}


//Responsible for loading in the data using API calls prior to page loading.
// export async function getStaticProps() {
//     console.log("hey");
//     return {
//         props: { results: "Yippy!" }
//     }
// }


