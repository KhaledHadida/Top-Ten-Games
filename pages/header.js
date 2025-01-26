import axios from 'axios';
import { useEffect, useState } from 'react';
import { loginUser } from './api/userapi';
import { useAuth } from '../contexts/authcontext';
import { deleteCookie } from './api/cookiemanage';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { FaSignOutAlt } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa";



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

    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <p className="flex items-center">
                <img src="/Images/TTG.png" className="mr-3 h-6 sm:h-9" alt="TTG Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Top Ten Games</span>
            </p>
            <div className="flex items-center order-2">
                <button onClick={handleLogout} className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:cursor-pointer hover:text-[#0036B1] flex flex-row items-center gap-3"><FaSignOutAlt size={20}/>Sign out </button>
            </div>
            <ul className="flex mt-4 font-medium space-x-10 lg:mt-0">
                <li>
                    <Link href="/mygames" className="py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 hover:text-[#0036B1] flex flex-row items-center gap-3"><FaGamepad size={20}/> My games</Link>
                </li>
                <li>
                    <Link href="/users" className="py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 hover:text-[#0036B1] flex flex-row items-center gap-3"><FaUsers size={20}/>Users</Link>
                </li>
            </ul>
        </div>
    </nav>
</>) : 
(<>
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link href='/' className="flex items-center">
                <img src="/Images/TTG.png" className="mr-3 h-6 sm:h-9" alt="TTG Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Top Ten Games</span>
            </Link>
            <div className="flex items-center lg:order-2">
                <Link href='/signin' className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 hover:cursor-pointer hover:text-[#0036B1] flex flex-row items-center gap-3"><FaSignInAlt size={20}/>Sign in </Link>
            </div>
        </div>
    </nav>
</>)

}   
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


