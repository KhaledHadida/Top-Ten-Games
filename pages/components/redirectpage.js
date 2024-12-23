//This is gonna be a template page for redirecting, I made it as flexible as possible 
import LoadingAnimation from "./loadinganimation"
import { useLoading } from "../../contexts/loadingcontext";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function RedirectPage({ text }) {
    const { setLoading, loading } = useLoading();
    const router = useRouter();

    //once loaded
    useEffect(() => {
        setLoading(true);
        // Redirect to sign-in after a delay
        setTimeout(() => {
            setLoading(false);
            router.push('/signin');
        }, 2000); // Adjust the delay as needed
    }, []);

    return (
        <div className="content-center mx-auto">
            <h1 className="text-center text-2xl">{text}</h1>
            <LoadingAnimation />
        </div>
    )
}