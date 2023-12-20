import '@/styles/globals.css'
import { AuthProvider } from './contexts/authcontext'
import { LoadingProvider, useLoading } from './contexts/loadingcontext';
import { useState, useEffect } from 'react';
import LoadingAnimation from './components/loadinganimation';
import { useRouter } from 'next/router'; // Import the useRouter

export default function App({ Component, pageProps }) {
  //This is so we have global access to loading screen.
  //const [loading, setLoading] = useState(false);

  return (
      <AuthProvider>
        <LoadingProvider>
          {/* <LoadingAnimation />  This is global loading anim I removed temporarily?*/}
          <div className="bg-lighter-blue">
          <Component {...pageProps}/>
          </div>
        </LoadingProvider>
      </AuthProvider >

  )
}
