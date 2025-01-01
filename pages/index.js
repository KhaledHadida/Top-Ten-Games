import Header from "./header"
//Background
import AnimationBackground from "./components/animationbackground";
import Link from 'next/link';



//This is for home page that shows Welcome 
export default function Home() {
  
  return (
    <div className="flex flex-col min-h-screen drop-shadow-lg" style={{
      overflow: "hidden"
    }}>
      <Header />
      <main className="flex flex-col items-center justify-center flex-1" >
        <AnimationBackground />
        <div className="text-center bg-white p-5 rounded-lg" style={{ zIndex: 1 }}>
          <p className="text-3xl">Welcome to</p>
          <h1 className="font-extrabold text-8xl mb-4">Top Ten Games</h1>
          <p className="text-3xl mb-4">Rank your top ten games and share your review with friends!</p>
          {/* button for sign in */}
          <div className="py-5">
            <Link className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-3xl px-5 py-2.5 text-center me-2 mb-2" href="/signin">Sign In</Link>
          </div>
        </div>
      </main>
    </div>
  );


}