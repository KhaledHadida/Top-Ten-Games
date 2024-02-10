import { useEffect } from "react";

//Animation background - I want the boxes to represent users' game reviews coming together
export default function AnimationBackground() {
    //Get a random value 
    const getRandomValue = (numb) => {
        const randomValue = Math.floor(Math.random() * numb);
        return randomValue;
    };
    //This is a temporary variable to
    var dynamicKeyframes = '';
    //This is to randomly generate the style at once
    for (let i = 0; i < 100; i++) {
        const uniqueAnimationName = `moveBox${i}`;
        //Just some random generator - wanted max to be 125 so it can go off the screen
        const randomValueX = getRandomValue(125);
        const randomValueY = getRandomValue(125);
        //To create random styles where the boxes can go to different positions on the page.
        dynamicKeyframes += `
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
            left: ${randomValueX}%;
            top: ${randomValueY}%;
          }
        }
      `;
    }

    //use Effect is needed to access document so we can create an element with styles
    useEffect(() => {
        //dynamically create an element 
        const styleTag = document.createElement('style');
        styleTag.appendChild(document.createTextNode(dynamicKeyframes));
        document.head.appendChild(styleTag);
    }, []);

    const createBoxes = () => {
        const numBoxes = 100;
        const boxes = [];

        for (let i = 0; i < numBoxes; i++) {
            const uniqueAnimationName = `moveBox${i}`;
            const randNum = getRandomValue(10);
            const boxStyle = {
                animation: `${uniqueAnimationName} 10s ease-in-out infinite`,
                left: `50%`,
                opacity: 0,
                zindex: -30,
                animationDelay: `${ randNum }s`,

            };

            boxes.push(<div key={i} className="box rounded-lg" style={boxStyle}></div>);
        }

        return boxes;
    };

    return (
        <div className="boxes-container">
            {createBoxes()}
        </div>
    )
}