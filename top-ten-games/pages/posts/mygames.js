import Header from "../header"

export default function FirstPost() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  return (
    <main className={`min-h-screen flex-col items-center justify-between space-y-4`}>
      {/* Imported header */}
      <Header />
      {/*The game panel */}
      <h1 className="text-center font-bold text-3xl">USERNAME'S top ten games</h1>
      <div className="flex items-center">
      <p className="mx-20">#1</p>
      <div className="font-mono flex-grow rounded-md bg-blue-500 mr-24 p-4 relative">
        <div className="flex justify-between">
          {/*This flex is to set the picture and description beside each other horizontally*/}
          <div className="flex">
            <img className="rounded-full mr-5" style={{ width: 250, height: 250 }} src="/Images/witcher.jpg" alt="image description"></img>
            <div className="flex-col">
              <h1 className="text-2xl">Witcher 3</h1>
              <p>Witcher is an awesome game</p>
            </div>
          </div>
        </div>
        {/* X button */}
        <button className="absolute top-2 right-2">
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      </div>

    </main>

  )
}
