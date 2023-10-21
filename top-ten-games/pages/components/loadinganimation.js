import { useLoading } from "../loadingcontext";
import Image from 'next/image'

function LoadingAnimation() {
    const { loading } = useLoading();
    console.log("Loading is " + loading)
    return loading ? (
        <div className="loading-animation">
            {/* Your loading animation UI */}
            <div className="spinner">
                <Image
                    src={"/images/spinner.gif"}
                    width={25} height={100}
                    style={{ width: '5%', margin: 'auto', display: 'block' }}
                    alt="Loading..."
                />
            </div>
        </div>
    ) : null;
}

export default LoadingAnimation;
