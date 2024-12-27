import { useLoading } from "../../contexts/loadingcontext";

function LoadingAnimation() {
    const { loading } = useLoading();
    console.log("Loading is " + loading)
    return loading ? (
        <div className="loading-animation">
            {/* Your loading animation UI */}
            <div className="spinner ">
                <img
                    src={"/images/spinner.gif"}
                    width={100} height={100}
                    style={{margin:"auto"}}
                    alt="Loading..."
                />
            </div>
        </div>
    ) : null;
}

export default LoadingAnimation;
