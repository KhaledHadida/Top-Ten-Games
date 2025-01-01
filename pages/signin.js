import Header from "./header";
import { useState } from "react";
import { loginUser } from "./api/userapi";
import { useRouter } from 'next/router';
import { useAuth } from "../contexts/authcontext";
//Loading
import LoadingAnimation from "./components/loadinganimation";
import { checkUserAuth } from "./api/userapi";
import { useLoading } from "../contexts/loadingcontext";
import Link from 'next/link';
import Head from 'next/head';

import AnimationBackground from "./components/animationbackground";

export default function SignIn() {
    const router = useRouter();

    //This is for loading purposes which we can toggle
    const { setLoading, loading } = useLoading();
    const { isLoggedIn, login, logout } = useAuth();

    const [loginError, setLoginError] = useState(false);
    //Error such as "bad password, email already exists" (only 2 for now)
    const [signInError, setSignInError] = useState([]);

    //Email and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Handle changes
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }


    //Handle login
    const handleLogin = async (e) => {
        //Stop it from refreshing for each entry
        e.preventDefault();
        try {
            setLoading(true);
            // Perform login logic here
            await loginUser(email, password);
            login();
            // If login is successful, navigate to the "mygames" page
            router.push('./mygames'); // Replace '/mygames' with the actual path of your "mygames" page
        } catch (error) {
            // Handle login failure
            setLoginError(true);
            setSignInError(error.response.data.errors);
            //Loading off
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col min-h-screen drop-shadow-lg" style={{overflow: "hidden"}}>
                <Head>
                    <title>Sign in</title>
                </Head>
                {(<div className="bg-lighter-blue min-h-screen flex flex-col justify-center items-center" >
                    <div className="bg-white p-2.5 rounded p-10 shadow-2xl outline outline-2 outline-blue-500 w-1/3" style={{ zIndex: 1 }}>
                        <form onSubmit={handleLogin} >
                            <h1 className="text-3xl font-semibold">Sign in</h1>
                            <div className="mt-4">
                                <label htmlFor="email" className="block font-bold">Email</label>
                                <input
                                    id="email"
                                    type="text"
                                    placeholder="Enter Email"
                                    onChange={handleEmailChange}
                                    className="p-2.5 text-sm w-full bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="password" className="block font-bold">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter Password"
                                    onChange={handlePasswordChange}
                                    className="p-2.5 text-sm w-full bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className="mt-6">
                                {loading ? (<LoadingAnimation />
                                ) : (<button
                                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full"
                                    type="submit"
                                //Close the pop-up and update game with API & add the newest game so we can refresh it on the frontend
                                //onClick={handleLogin}
                                >
                                    Login
                                </button>)}

                            </div>
                            {loginError ? (signInError.map((error, index) => (<p className="text-red-600" key={index}>{error.message || error}</p>))
                            ) : (
                                <></>)}
                            {/* register button */}
                            <div>
                                <p className="mt-5">No account? <Link className="text-blue-600 dark:text-blue-500 hover:underline" href="../register">Register here</Link></p>
                            </div>
                        </form>
                    </div>
                </div>)}
            </div>
            
            {/* The sign in panel */}

        </>
    )
}