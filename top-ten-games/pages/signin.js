import Header from "./header";
import { useState } from "react";
import { loginUser } from "./api/userapi";
import { useRouter } from 'next/router';
import { useAuth } from "./contexts/authcontext";
//Loading
import LoadingAnimation from "./components/loadinganimation";
import { checkUserAuth } from "./api/userapi";
import { useLoading } from "./contexts/loadingcontext";
//Yup - validation library
import * as yup from 'yup';


export default function SignIn() {
    const router = useRouter();

    //This is for loading purposes which we can toggle
    const { setLoading, loading } = useLoading();
    const { isLoggedIn, login, logout } = useAuth();

    const [loginError, setLoginError] = useState(false);

    //Email and password
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    //Yup schematic for email + pass
    const schema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required')
    });

    //Handle changes
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    //First check if user has auth
    const checkAuthentication = async () => {
        const userAuth = await checkUserAuth(token);
        //If we are denied access.. send them to login page
        if (userAuth == null) {
            router.push('./signin');
        }
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
            //Load in
            // If login is successful, navigate to the "mygames" page
            router.push('./mygames'); // Replace '/mygames' with the actual path of your "mygames" page
        } catch (error) {
            // Handle login failure
            setLoginError(true);
            console.error('Login error:', error);
            //Loading off
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            {(<div className="bg-lighter-blue min-h-screen flex flex-col justify-center items-center">
                <div className="bg-white p-2.5 rounded p-10 shadow-2xl outline outline-2 outline-blue-500" style={{ width: "50%" }}>
                    <form onSubmit={handleLogin} >
                        <h1 className="text-3xl font-semibold text-center">Sign in</h1>
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
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full"
                                type="submit"
                            // Close the pop-up and update game with API & add the newest game so we can refresh it on the frontend
                            //onClick={handleLogin}
                            >
                                Login
                            </button>)}

                        </div>
                        {loginError ? (<p className="text-red-600">Invalid Login</p>) : (
                            <></>)}
                        {/* register button */}
                        <div>
                            <p>No account? <a className="text-blue-600" href="../register">Register here!</a></p>
                        </div>
                    </form>
                </div>
            </div>)}
            {/* The sign in panel */}

        </>
    )
}