import Header from "../header";

export default function Register() {
    return (
        <>
                <Header />
                {/* The register panel */}
                <div className="bg-indigo-500 min-h-screen flex flex-col justify-center items-center">
                    <div className="bg-white p-2.5 rounded" style={{width:"50%"}}>
                        <h1 className="text-3xl font-semibold items-center text-center">Register below</h1>
                        <div className="mt-4">
                            <label htmlFor="username" className="block font-bold">Username</label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter Username"
                                className="p-2.5 text-sm w-full bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email" className="block font-bold">Email</label>
                            <input
                                id="email"
                                type="text"
                                placeholder="Enter Email"
                                className="p-2.5 text-sm w-full bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password" className="block font-bold">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter Password"
                                className="p-2.5 text-sm w-full bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="mt-6">
                            <button
                                className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full"
                                type="button"
                                // Close the pop-up and update game with API & add the newest game so we can refresh it on the frontend
                                onClick={() => { }}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
        </>
    )
}