import Header from "../header";
import { useEffect, useState } from "react";
import UserEntry from "../components/userentry";
import { fetchUsers } from "../api/userapi";
///////////////Check user auth
import { checkUserAuth } from "../api/userapi";
import { getCookie } from '../api/cookiemanage';
import { useRouter } from "next/router";
///////////////


export default function Users() {
    const [searchUser, setSearchUser] = useState("");
    const [usersFound, setUsersFound] = useState([]);

    const router = useRouter();
    //Disable user from trying to access page without credentials
    useEffect(() => {
        console.log("refresh" + usersFound.length);
        const token = getCookie('userId');
        //First check if user 
        const checkAuthentication = async () => {
            const userAuth = await checkUserAuth(token);
            //If we are denied access.. send them to login page
            if (!userAuth) {
                router.push('./signin');
            }
        }
        checkAuthentication();
    }, [usersFound]); //Only run once when page loads

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Do something with the form data, such as send it to a server
        //WAIT - we need to get users first async
        const users = await fetchUsers(searchUser);
        //Now check do we have them in an array?
        if (Array.isArray(users)) {
            console.log("found any users with that search");
            setUsersFound(users);
        } else {
            console.log(`Did not find any users with that search ${searchUser} and ${users.length}`);
        }
    };

    //Search users per stroke
    const handleChange = (event) => {
        setSearchUser(event.target.value);
    };

    return (
        <>
            <Header />
            <main className={`min-h-screen flex-col items-center justify-between space-y-4`}>
                <div className="flex justify-center items-center">
                    {/* This is search bar */}
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Search Users by Name" value={searchUser} onChange={handleChange} />
                        <button type="submit" style={{ margin: "20px" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </button>
                    </form>
                    {/* User profiles according to search */}
                </div>
                {Array.isArray(usersFound) ? (
                    usersFound.map((user) => (
                        <UserEntry key={user._id} name={user.name} />
                    ))
                ) : <p>No Users found.</p>}
            </main>
        </>
    );
}
