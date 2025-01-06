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
        <div className="text-center bg-[#87c4ff] bg-opacity-85 p-10 rounded-lg drop-shadow-lg" style={{ zIndex: 1 }}>
          <p className="text-3xl">Welcome to</p>
          <h1 className="font-extrabold text-8xl mb-4">Top Ten Games</h1>
          <p className="text-3xl mb-4 text-[#112D4E]">Rank your top ten games and share your review with friends!</p>
          {/* button for sign in */}
          <div className="pt-10 pb-5">
            <Link className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-5 border-b-4 border-blue-700 hover:border-blue-800 rounded text-2xl" href="/signin">Sign In</Link>
          </div>
        </div>
      </main>
    </div>
  );


}