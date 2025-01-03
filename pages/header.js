import axios from 'axios';
import { useEffect, useState } from 'react';
import { loginUser } from './api/userapi';
import { useAuth } from '../contexts/authcontext';
import { deleteCookie } from './api/cookiemanage';
import { useRouter } from 'next/router';
import Link from 'next/link';


export default function Header() {
    const [data, setData] = useState({});
    //So we can track if user is logged in or not
    const { fetchLoginStatus, isLoggedIn, login, logout } = useAuth();
    const router = useRouter();

    //See if we need to login the user or out ?
    useEffect(() => {
        const fetchStatus = async () => {
            // Fetch the login status
            const status = await fetchLoginStatus();
            console.log("Current login status is " + status);
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
            router.push('/'); // Replace '/mygames' with the actual path of your "mygames" page
        } catch (error) {
            // Handle login failure
            console.error('Logout failure:', error);
        }
    };

    return (

        <header>
            {isLoggedIn ? (<>
                <ul className="flex items-center justify-between bg-normal-blue p-2 relative z-10 shadow-2xl text-xl">
                {isLoggedIn ? (<>
                    <h1 className="font-extrabold pl-10 py-5 underline " style={{ fontSize: 25 }}>
                        Top Ten Games
                    </h1>
                    <li className="mr-6">
                        <Link className="text-white hover:text-blue-800" href="/users">Users</Link>
                    </li>
                    <li className="mr-6">
                        <Link className="text-white hover:text-blue-800" href="/mygames">My Games</Link>
                    </li></>) : (null)}
                {isLoggedIn ? (<li className="mr-6">
                    <button className="text-white hover:text-blue-800" onClick={handleLogout}>Sign Out</button>
                </li>) :
                    (<>
                        <h1 className="font-extrabold pl-10 py-5 underline font-mono" style={{ fontSize: 30 }}>
                            <Link href="/"><h1>Top Ten Games</h1></Link>
                        </h1>
                        <li className="mr-6">
                            <Link className="text-white hover:text-blue-800" href="/signin">Sign In</Link>
                        </li>
                    </>
                    )}
                {/* onClick={handleSignIn} */}
                </ul>
            
            </>): (null)}
            
        </header>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
        }
    }
}


//Responsible for loading in the data using API calls prior to page loading.
// export async function getStaticProps() {
//     console.log("hey");
//     return {
//         props: { results: "Yippy!" }
//     }
// }


