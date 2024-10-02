import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import "./styles.css";

// Images
import controllerImage from "../../assets/controller.png";

// Games
import PongGame from "./Games/Pong";
// test

const MyArcade: React.FC = () => {
    const [gameActive, setGameActive] = useState(false);
    const nodeRef = useRef(null);

    const handleKeyDownOpenClose = (
        event: React.KeyboardEvent<HTMLButtonElement>
    ) => {
        if (event.key === "Enter") {
            setGameActive((gameActive) => !gameActive);
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
        <div className="hidden w-full lg:block">
            <div className="arcade h-[160px] w-[350px]">
                <button
                    className="bg-primaryColor flex h-[160px] w-[350px] transform cursor-pointer flex-col items-center justify-center rounded-md p-10 hover:scale-105 hover:shadow-[0_0_20px_var(--color-accent),0_0_20px_var(--color-accent)] hover:brightness-125 hover:saturate-[1.1] hover:filter"
                    onClick={() => setGameActive((gameActive) => !gameActive)}
                    onKeyDown={handleKeyDownOpenClose}
                >
                    <img
                        src={controllerImage}
                        alt="Game controller"
                        className="h-[105px] w-[165px] select-none"
                        width="165"
                        height="105"
                    />
                </button>
            </div>
            {gameActive && (
                <Draggable
                    handle=".game-navbar"
                    nodeRef={nodeRef}
                    positionOffset={{ x: "-50%", y: "-50%" }}
                >
                    <div ref={nodeRef} className="game">
                        <div
                            className="game-navbar bg-primaryColor border-accentSecondaryColor flex w-full cursor-move flex-row items-center justify-between rounded-t-xl border-2 border-solid p-2"
                            style={{
                                borderBottom: "none",
                            }}
                        >
                            <h1 className="game-navbar-title ml-2 select-none">
                                Arcade
                            </h1>
                            <button
                                onClick={() => setGameActive(false)}
                                onKeyDown={handleKeyDownClose}
                                className="group cursor-pointer border-none bg-none p-0 text-inherit outline-inherit"
                                style={{
                                    background: "none",
                                }}
                            >
                                <h1 className="game-navbar-close-text group-hover:text-accentTertiaryColor text-titleColorPrimary text-xl group-hover:scale-125 group-hover:transform">
                                    X
                                </h1>
                            </button>
                        </div>
                        <div className="game-content bg-primaryColor border-accentSecondaryColor flex h-[400px] w-[500px] flex-col items-center justify-center rounded-b-xl border-2 border-solid p-2">
                            {/* <p className="text-lg">
                                The arcade is currently unavailable
                            </p> */}
                            <PongGame />
                        </div>
                    </div>
                </Draggable>
            )}
        </div>
    );
};

const MemoizedMyArcade = React.memo(MyArcade);
export default MemoizedMyArcade;
