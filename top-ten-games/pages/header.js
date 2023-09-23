export default function Header() {
    return (
        <header>

            <ul className="flex items-center justify-between bg-red-400">
                <h1 className="font-extrabold pl-10 py-2" style={{ fontSize: 25 }}>Top Ten Games</h1>
                <li className="mr-6">
                    <a class="text-blue-500 hover:text-blue-800" href="">Users</a>
                </li>
                <li className="mr-6">
                    <a class="text-blue-500 hover:text-blue-800" href="mygames">My Games</a>
                </li>
                {/* <li className="mr-6">
                    <a class="text-blue-500 hover:text-blue-800" href="#">Link</a>
                </li>
                <li class="mr-6">
                    <a class="text-gray-400 cursor-not-allowed" href="#">Disabled</a>
                </li> */}
                <button className="mr-6 bg-red-400 px-4 py-2">Sign in</button>
            </ul>

        </header>
    )
}

//Responsible for loading in the data using API calls prior to page loading.
export async function getStaticProps() {
    return {
        props: { results: "Yippy!" }
    }
}
