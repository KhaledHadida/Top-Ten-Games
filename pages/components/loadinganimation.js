import { useLoading } from "../../contexts/loadingcontext";

function LoadingAnimation() {
    const { loading } = useLoading();
    return loading ? (
        <div className="loading-animation">
            {/* Your loading animation UI */}
            <div className="spinner ">
                <img
                    src={"/Images/spinner.gif"}
                    width={100} height={100}
                    style={{margin:"auto"}}
                    alt="Loading..."
                />
            </div>
        </div>
    ) : null;
}

export default LoadingAnimation;
