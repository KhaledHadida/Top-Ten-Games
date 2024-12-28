import '@/styles/globals.css'
import { AuthProvider } from '../contexts/authcontext'
import { LoadingProvider, useLoading } from '../contexts/loadingcontext';
import { useState, useEffect } from 'react';
import LoadingAnimation from './components/loadinganimation';
import { useRouter } from 'next/router'; // Import the useRouter
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  //This is so we have global access to loading screen.
  //const [loading, setLoading] = useState(false);

  return (
    <AuthProvider>
      <Head>
        <title>Top Ten Games</title>
      </Head>
      <LoadingProvider>
        {/* <LoadingAnimation />  This is global loading anim I removed temporarily?*/}
        <div className="bg-lighter-blue overflow-hidden">
          <Component {...pageProps} />
        </div>
      </LoadingProvider>
    </AuthProvider >

  )
}
