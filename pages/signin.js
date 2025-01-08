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
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";


import AnimationBackground from "./components/animationbackground";

export default function SignIn() {
    const router = useRouter();

    //This is for loading purposes which we can toggle
    const { setLoading, loading } = useLoading();
    const { isLoggedIn, login, logout } = useAuth();

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    //Error such as "bad password, email already exists" (only 2 for now)
    const [signInError, setSignInError] = useState([]);

    //Email and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Handle changes
    const handleEmailChange = (e) => {
        setEmailError(false);
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPasswordError(false);
        setPassword(e.target.value);
    }


    //Handle login
    const handleLogin = async (e) => {
        if (email === "") {
            setEmailError(true);
        }
        if (password === "") {
            setPasswordError(true);
        }
        //Loading off
        setLoading(false);
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
                    <div className="bg-white rounded p-10 shadow-2xl w-1/3" style={{ zIndex: 1 }}>
                        <form onSubmit={handleLogin} >
                            <h1 className="text-4xl font-semibold">Sign in</h1>
                            <div className="mt-4">
                                <label htmlFor="email" className="block font-bold">Email</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <MdEmail/>
                                    </div>
                                    <input 
                                        type="text" 
                                        id="email" 
                                        className={emailError ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full ps-10 p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" 
                                            : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} 
                                        placeholder=""
                                        onChange={handleEmailChange}
                                    />
                                </div>
                                {emailError ? (<p className="mt-2 text-sm text-red-600 dark:text-red-500">Email cannot be empty</p>) : (<></>)}
                            </div>
                            <div className="mt-4">
                                <label htmlFor="password" className="block font-bold">Password</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <RiLockPasswordFill/>
                                    </div>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        className={passwordError ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full ps-10 p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                                            :"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} 
                                        placeholder=""
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                                {passwordError ? (<p className="mt-2 text-sm text-red-600 dark:text-red-500">Password cannot be empty</p>) : (<></>)}
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
                            {/* {loginError ? (signInError.map((error, index) => (<p className="text-red-600" key={index}>{error.message || error}</p>))
                            ) : (
                                <></>)} */}
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