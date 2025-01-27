import Header from "./header";
import { useEffect, useState } from "react";
import UserEntry from "./components/userentry";
import { fetchUsers } from "./api/userapi";
///////////////Check user auth
import { checkUserAuth } from "./api/userapi";
import { getCookie } from './api/cookiemanage';
import { useRouter } from "next/router";
import { useAuth } from "../contexts/authcontext";
///////////////
import { useLoading } from "../contexts/loadingcontext";
import LoadingAnimation from "./components/loadinganimation";

import Head from 'next/head';


export default function Users() {
    const [searchUser, setSearchUser] = useState("");
    const [usersFound, setUsersFound] = useState([]);
    //Bool for finding users or not
    const [userFound, setUserFound] = useState(true);
    const { login, logout } = useAuth();
    const { setLoading, loading } = useLoading();


    const router = useRouter();
    //Disable user from trying to access page without credentials
    useEffect(() => {
        const token = getCookie('userId');
        //First check if user 
        const checkAuthentication = async () => {
            const userAuth = await checkUserAuth(token);
            //If we are denied access.. send them to login page
            if (userAuth == null) {
                logout();
                router.push('./signin');
            } else {
                //We could move this (since it is also in mygames.js) to the header that way it is "global"
                login();
            }
        }
        checkAuthentication();
    }, [usersFound]); //Only run once when page loads


    useEffect(() => {

        searchUsers();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        //Show loading till we fetch users!
        setLoading(true);
        // Do something with the form data, such as send it to a server
        //WAIT - we need to get users first async

        await searchUsers();

    };

    //Search for users - Separated it so that I can call it upon loading the page.
    const searchUsers = async () => {
        const users = await fetchUsers(searchUser).then((allusers) => {
            setLoading(false);
            //Now check do we have them in an array?
            if (allusers.length > 0) {
                //Sort the user list alphabetically
                allusers.sort(compare);
                //We found a user.. NICE!
                setUserFound(true);
                //We load these users up!
                setUsersFound(allusers);
            } else {
                console.log(`Did not find any users with that search ${searchUser} and ${allusers.length}`);
                //We did not find a user :(
                setUserFound(false);
                //Show on page no users found
            }
        }
        );
    }

    //Search users per stroke
    const handleChange = (event) => {
        setSearchUser(event.target.value);
    };

    //Basically a param used to sort the users by name alphabetically
    function compare(a, b) {
        if (a.name < b.name) {
            return -1;
        } else {
            return 1;
        }
    }

    return (
        <>
            <Header />
            <Head>
                <title>Search for Users</title>
            </Head>
            <main className={`min-h-screen flex-col items-center justify-between space-y-4 mx-20`}>
            <h1 className="font-bold text-4xl my-5">Search User</h1>
                <div className="">
                    {/* This is search bar */}
                    <form onSubmit={handleSubmit} className="z-10">
                        <input type="text" placeholder="Search Users by Name" value={searchUser} onChange={handleChange} style={{ width: '95%', padding: '10px' }} />
                        <button type="submit" >
                            <svg style={{ width: '95%', marginLeft: '10px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </button>
                    </form>
                    {/* User profiles according to search */}
                </div>
                {/* Basically here I am first checking if it is loading.. If it is loaded show the users found if not show loading */}
                <div className="flex gap-5 flex-wrap">
                {loading ? (<LoadingAnimation />) : (
                    userFound ? (
                        usersFound.map((user) => (
                                <UserEntry key={user._id} name={user.name} id={user._id} profilePic={user.profilePicId} desc={user.profileBio} />
                        ))
                    ) : <p className="text-2xl text-center font-extralight">No Users found..</p>)}
                </div>
            </main>
        </>
    );
}
