import Header from "./header";
import { registerUser } from "./api/userapi";
import { useState, useEffect } from "react";
import { useLoading } from "./contexts/loadingcontext";
import LoadingAnimation from "./components/loadinganimation";
import { useRouter } from 'next/router';

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
    //Error such as "bad password, email already exists" (only 2 for now)
    const [registerError, setRegisterError] = useState([]);

    //Random num generator for profile pics
    const maxNumOfPics = 9;
    const randomProfilePic = Math.floor(Math.random() * maxNumOfPics);

    const handleRegister = async (e) => {
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
        setEmail(e.target.value);
    }

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <>
            <Header />
            {/* The register panel */}
            <div className="bg-lighter-blue min-h-screen flex flex-col justify-center items-center">
                <div className="bg-white p-2.5 rounded shadow-2xl p-10 outline outline-2 outline-blue-500" style={{ width: "50%" }}>
                    <form onSubmit={handleRegister} >
                        <h1 className="text-3xl font-semibold items-center text-center">Register below</h1>
                        <div className="mt-4">
                            <label htmlFor="userName" className="block font-bold">Name</label>
                            <input
                                id="userName"
                                type="text"
                                placeholder="Enter Name"
                                onChange={handleUserNameChange}
                                className="p-2.5 text-sm w-full bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
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
                        <p className={`text-center mb-5 text-green-500 font-bold ${registerComplete ? '' : 'hidden'}`}>Your account has been successfully registered! Redirecting..</p>
                        {loading ? (<LoadingAnimation />) : (<div className="mt-6">
                            <button
                                className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full"
                                type="submit"
                            // Close the pop-up and update game with API & add the newest game so we can refresh it on the frontend
                            >
                                Register
                            </button>
                        </div>)}
                        {IsRegisterError ? registerError.map((error, index) => (<p className="text-red-600" key={index}>{error.message || error}</p>)) : (
                            <></>)}
                    </form>
                </div>
            </div>
        </>
    )
}