import Header from "../header";
import { useState } from "react";
import UserEntry from "../components/userentry";

export default function Users() {
    const [searchUser, setSearchUser] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Form submitted with value: ${profiles[0].user.name}`);
        // Do something with the form data, such as send it to a server
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
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Search Users by Name" value={searchUser} onChange={handleChange}  />
                        <button type="submit" style={{margin:"20px"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </button>
                    </form>
                    {/* User profiles according to search */}
                </div>
                <UserEntry />

            </main>
        </>
    );
}
