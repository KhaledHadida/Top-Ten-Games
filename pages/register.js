import Header from "./header";
import { registerUser } from "./api/userapi";
import { useState, useEffect } from "react";
import { useLoading } from "../contexts/loadingcontext";
import LoadingAnimation from "./components/loadinganimation";
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from "next/link";

import { FaCircleUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

export default function Register() {

    const router = useRouter();

    const { setLoading, loading } = useLoading();

    //Email and password
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    //Register bool - to toggle a message to indicate success in creating an email.
    const [registerComplete, setRegisterComplete] = useState(false);

    //Error handling
    const [IsRegisterError, setIsRegisterError] = useState(false);
    //Error such as "bad password, email already exists"
    const [userNameError, setUserNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [registerError, setRegisterError] = useState([]);

    //Random num generator for profile pics
    const maxNumOfPics = 9;
    const randomProfilePic = Math.floor(Math.random() * maxNumOfPics);

    const handleRegister = async (e) => {
        if (userName === ""){
            setUserNameError(true);
        }
        if (email === "") {
            setEmailError(true);
        }
        if (password === "") {
            setPasswordError(true);
        }
        //Stop it from refreshing for each entry
        e.preventDefault();
        console.log(userName);
        try {
            setLoading(true);
            // Perform login logic here
            const result = await registerUser(userName, email, password, randomProfilePic)
            setRegisterComplete(true);
            //Clean the password out of state!
            setPassword('');
            // Redirect to sign-in after a delay
            setTimeout(() => {
                setLoading(false);
                router.push('/signin');
            }, 5000);

        } catch (error) {
            // Handle login failure
            setIsRegisterError(true);
            //Check if it's an array - if not then make it into one
            setRegisterError(error.response.data.errors);
            //Loading off
            setLoading(false);
        }
        //Register
    };

    //Handle changes
    const handleEmailChange = (e) => {
        setEmailError(false);
        setEmail(e.target.value);
    }

    const handleUserNameChange = (e) => {
        setUserNameError(false);
        setUserName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPasswordError(false);
        setPassword(e.target.value);
    }

    return (
        <>
            <Header />
            <Head>
                <title>Register</title>
            </Head>
            {/* The register panel */}
            <div className="bg-lighter-blue min-h-screen flex flex-col justify-center items-center">
                <div className="bg-white rounded shadow-2xl p-10 w-1/3">
                    <form onSubmit={handleRegister} >
                        <h1 className="text-3xl font-semibold items-center">Create an Account</h1>
                        <p>Your ranking journey starts here.</p>
                        <div className="mt-4">
                            <label htmlFor="userName" className="block font-bold">Username</label>
                            <div className="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <FaCircleUser/>
                                </div>
                                <input
                                    id="userName"
                                    type="text"
                                    placeholder=""
                                    onChange={handleUserNameChange}
                                    className={userNameError ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full ps-10 p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" 
                                        : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} 
                                />
                            </div>
                            {userNameError ? (<p className="mt-2 text-sm text-red-600 dark:text-red-500">Username is empty</p>) : (<></>)}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email" className="block font-bold">Email Address</label>
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
                            <p className="italic text-xs">The email does not have to be real.</p>
                            {emailError ? (<p className="mt-2 text-sm text-red-600 dark:text-red-500">Email is invalid</p>) : (<></>)}
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
                        <p className={`text-center mb-5 text-green-500 font-bold ${registerComplete ? '' : 'hidden'}`}>Your account has been successfully registered! Redirecting..</p>
                        {loading ? (<LoadingAnimation />) : (<div className="mt-6">
                            <button
                                className="bg-blue-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full"
                                type="submit"
                            // Close the pop-up and update game with API & add the newest game so we can refresh it on the frontend
                            >
                                Register
                            </button>
                        </div>)}
                    </form>
                    <p className="mt-5">Already have an account? <Link className="text-blue-600 dark:text-blue-500 hover:underline" href="/signin">Sign in</Link></p>
                </div>
            </div>
        </>
    )
}