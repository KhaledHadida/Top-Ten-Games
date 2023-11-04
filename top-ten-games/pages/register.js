import Header from "./header";
import { registerUser } from "./api/userapi";
import { useState } from "react";
import { useLoading } from "./contexts/loadingcontext";
import LoadingAnimation from "./components/loadinganimation";
import { useRouter } from 'next/router';

export default function Register() {

    const router = useRouter();

    const { setLoading, loading } = useLoading();

    //Email and password
    const [email, setEmail] = useState();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

    //Error
    const [IsRegisterError, setIsRegisterError] = useState(false);
    //Error such as "bad password, email already exists" (only 2 for now)
    const [registerError, setRegisterError] = useState("");

    const handleRegister = async (e) => {
        //Stop it from refreshing for each entry
        e.preventDefault();
        try {
            setLoading(true);
            // Perform login logic here
            await registerUser(userName, email, password).then(() => setLoading(true));
            // If register is successful, navigate to the "mygames" page
            router.push('./signin'); // Replace '/mygames' with the actual path of your "mygames" page
        } catch (error) {
            // Handle login failure
            setIsRegisterError(true);
            console.error('Login error:', error);
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
            <div className="bg-indigo-500 min-h-screen flex flex-col justify-center items-center">
                <div className="bg-white p-2.5 rounded" style={{ width: "50%" }}>
                    <form onSubmit={handleRegister} >
                        <h1 className="text-3xl font-semibold items-center text-center">Register below</h1>
                        <div className="mt-4">
                            <label htmlFor="username" className="block font-bold">Username</label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter Username"
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
                        {loading ? (<LoadingAnimation />) : (<div className="mt-6">
                            <button
                                className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full"
                                type="submit"
                            // Close the pop-up and update game with API & add the newest game so we can refresh it on the frontend
                            >
                                Register
                            </button>
                        </div>)}
                        {IsRegisterError ? (<p className="text-red-600">Register Error</p>) : (
                            <></>)}
                    </form>
                </div>
            </div>
        </>
    )
}