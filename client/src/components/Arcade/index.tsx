import React, { useState, useRef } from "react";
import Draggable from "react-draggable";

// Images
import controllerImage from "../../assets/controller.png";

// Games
// import JetpackZombiesGame from "./Games/JetpackZombies";
// import PongGame from "./Games/Pong";

const MyArcade: React.FC = () => {
    const [gameActive, setGameActive] = useState(false);
    const nodeRef = useRef(null);

    const handleKeyDownOpen = (
        event: React.KeyboardEvent<HTMLButtonElement>
    ) => {
        if (event.key === "Enter") {
            setGameActive(true);
        }
    };

    const handleKeyDownClose = (
        event: React.KeyboardEvent<HTMLButtonElement>
    ) => {
        if (event.key === "Enter") {
            setGameActive(false);
        }
    };

    return (
        <div className="hidden w-full md:block">
            <button
                className="bg-primaryColor border-accentColor flex w-full transform cursor-pointer flex-col items-center justify-center rounded-md border-2 border-solid p-10 hover:scale-105 hover:brightness-125 hover:saturate-[1.1] hover:filter"
                onClick={() => setGameActive(true)}
                onKeyDown={handleKeyDownOpen}
            >
                <img
                    src={controllerImage}
                    alt="Game controller"
                    className="h-[105px] w-[165px] select-none"
                />
            </button>
            {gameActive && (
                <Draggable
                    handle=".game-navbar"
                    nodeRef={nodeRef}
                    positionOffset={{ x: "-50%", y: "-50%" }}
                >
                    <div ref={nodeRef} className="game">
                        <div className="game-navbar">
                            <h1 className="game-navbar-title">Arcade</h1>
                            <button
                                className="game-navbar-close"
                                onClick={() => setGameActive(false)}
                                onKeyDown={handleKeyDownClose}
                            >
                                <h1 className="game-navbar-close-text">X</h1>
                            </button>
                        </div>
                    </div>
                </Draggable>
            )}
        </div>
    );
};

const MemoizedMyArcade = React.memo(MyArcade);
export default MemoizedMyArcade;
