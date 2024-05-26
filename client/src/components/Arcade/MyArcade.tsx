import { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";

import Card from "../StyleComponents/Card";
// import JetpackZombiesGame from "./Games/JetpackZombies";
// import PongGame from "./Games/Pong";

import controllerImage from "../../assets/controller.png";

const ArcadeBody = () => (
    <div className="arcade-logo-container">
        <img
            src={controllerImage}
            alt="Game controller"
            className="arcade-logo"
        />
    </div>
);

const MyArcade = () => {
    const [gameActive, setGameActive] = useState(false);
    const nodeRef = useRef(null);

    const handleArcadeClick = () => {
        setGameActive(true);
    };

    // Add event listener to arcade logo & unmount event listener
    useEffect(() => {
        const arcadeButton = document.querySelector(".arcade");
        if (arcadeButton) {
            arcadeButton.addEventListener("click", handleArcadeClick);

            return () => {
                arcadeButton.removeEventListener("click", handleArcadeClick);
            };
        }
    }, []);

    return (
        <>
            <Card bodyContent={<ArcadeBody />} customClass="arcade" />
            {gameActive && (
                <Draggable
                    handle=".game-navbar"
                    nodeRef={nodeRef}
                    positionOffset={{ x: "-50%", y: "-50%" }}
                >
                    <div ref={nodeRef} className="game">
                        <div className="game-navbar">
                            <h1 className="game-navbar-title">Arcade</h1>
                            <div
                                className="game-navbar-close"
                                onClick={() => setGameActive(false)}
                            >
                                <h1 className="game-navbar-close-text">X</h1>
                            </div>
                        </div>
                        {/* <JetpackZombiesGame /> */}
                        {/* <PongGame /> */}
                    </div>
                </Draggable>
            )}
        </>
    );
};

export default MyArcade;
