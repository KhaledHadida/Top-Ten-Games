import Header from "./header"
//Background
import AnimationBackground from "./components/animationbackground";
import Link from 'next/link';



//This is for home page that shows Welcome 
export default function Home() {
  
  //const { fetchLoginStatus, isLoggedIn, login, logout } = useAuth();

  //Check if user has token

  return (
    <div className="flex flex-col min-h-screen drop-shadow-lg" style={{
      overflow: "hidden"
    }}>
      <Header />
      <main className="flex flex-col items-center justify-center flex-1" >
        <AnimationBackground />
        <div className="text-center" style={{ zIndex: 1 }}>
          <h1 className="font-extrabold text-8xl mb-4">Welcome to Top Ten Games</h1>
          <h3 className="text-3xl mb-4">Where you can rank your top ten games and share your review with friends!</h3>
          <h4 className="text-2xl">Start with signing up!</h4>
        </div>
        {/* button for sign up */}
        <Link
          className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase px-6 py-5 rounded shadow hover:shadow-lg outline-none focus:outline-none w-1/6 my-10 text-center"
          href="/register" style={{ zIndex: 1 }}>
          Register
        </Link>
      </main>
    </div>
  );


}