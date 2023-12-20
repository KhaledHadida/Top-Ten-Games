import { useEffect } from "react";

export default function AnimationBackground() {

    useEffect(() => {
        const createDynamicKeyframes =  async (index) => {
            const uniqueAnimationName = `moveBox${index}`;
            const randomValue = getRandomValue();
            const randomValue2 = getRandomValue();
            const dynamicKeyframes = `
            @keyframes ${uniqueAnimationName} {
              0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
                left: 50%;
                top: 50%;
              }
              100% {
                transform: translate(50%, 50%) scale(1));
                opacity: 1;
                left: ${randomValue}%;
                top: ${randomValue2}%;
              }
            }
          `;

            const styleTag = document.createElement('style');
            styleTag.appendChild(document.createTextNode(dynamicKeyframes));
            document.head.appendChild(styleTag);

            // Delay before processing the next iteration (not working atm)
            await new Promise(resolve => setTimeout(resolve, 500));
        };

        const getRandomValue = () => {
            const randomValue = Math.floor(Math.random() * 100);
            console.log(randomValue);
            return randomValue;
        };

        const createKeyframesWithDelay = async () => {
            for (let i = 0; i < 20; i++) {
                await createDynamicKeyframes(i);
            }
        };

        createKeyframesWithDelay();
    }, []);

    const createBoxes = () => {
        const numBoxes = 20;
        const boxes = [];

        for (let i = 0; i < numBoxes; i++) {
            const uniqueAnimationName = `moveBox${i}`;
            const boxStyle = {
                animation: `${uniqueAnimationName} 10s ease-in-out infinite`,
            };

            boxes.push(<div key={i} className="box" style={boxStyle}></div>);
        }

        return boxes;
    };

    return (
        <div className="boxes-container">
            {createBoxes()}
        </div>
    )
}