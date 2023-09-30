import axios from 'axios';
import { useEffect, useState } from 'react';
import { setCookie } from './api/cookiemanage';
import { loginUser } from './api/userapi';

export default function Header() {
    const [data, setData] = useState({});
    return (
        <header>
            <ul className="flex items-center justify-between bg-red-400">
                <h1 className="font-extrabold pl-10 py-2" style={{ fontSize: 25 }}>Top Ten Games</h1>
                <li className="mr-6">
                    <a className="text-blue-500 hover:text-blue-800" href="users">Users</a>
                </li>
                <li className="mr-6">
                    <a className="text-blue-500 hover:text-blue-800" href="mygames">My Games</a>
                </li>
                {/* <li className="mr-6">
                    <a class="text-blue-500 hover:text-blue-800" href="#">Link</a>
                </li>
                <li class="mr-6">
                    <a class="text-gray-400 cursor-not-allowed" href="#">Disabled</a>
                </li> */}
                <button className="mr-6 bg-red-400 px-4 py-2" onClick={handleSignIn}>Sign in</button>
            </ul>
        </header>
    )
}

//Move this to a separate API file under the api folder (because we should keep api calls separate from front end)
function handleSignIn() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const email= 'khaled@example.com';
    const password = '123456';

    //Login the user.
    loginUser(email, password);

    //OLDDDD
    // axios.post(`${backendUrl}/api/users/login`, data, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })
    //     .then((response) => {
    //         console.log(response.data.token);
    //         //Store it in cookie, name it, and let it expire in 1 day.
    //         setCookie('userId', response.data.token, 1);
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });
}


//Responsible for loading in the data using API calls prior to page loading.
// export async function getStaticProps() {
//     console.log("hey");
//     return {
//         props: { results: "Yippy!" }
//     }
// }

export async function getServerSideProps() {

    return {
        props: {}
    }
}
