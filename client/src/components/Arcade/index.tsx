import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import "./styles.css";

// Images
import controllerImage from "../../assets/controller.png";

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
            <div className="arcade h-[160px] w-[350px]">
                <button
                    className="bg-primaryColor flex h-[160px] w-[350px] transform cursor-pointer flex-col items-center justify-center rounded-md p-10 hover:scale-105 hover:shadow-[0_0_20px_var(--color-accent),0_0_20px_var(--color-accent)] hover:brightness-125 hover:saturate-[1.1] hover:filter"
                    onClick={() => setGameActive(true)}
                    onKeyDown={handleKeyDownOpen}
                >
                    <img
                        src={controllerImage}
                        alt="Game controller"
                        className="h-[105px] w-[165px] select-none"
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
                            className="game-navbar bg-primaryColor border-accentSecondaryColor flex w-full cursor-move flex-row items-center justify-between border-2 border-solid p-2"
                            style={{
                                borderTopLeftRadius: "10px",
                                borderTopRightRadius: "10px",
                                borderBottom: "none",
                            }}
                        >
                            <h1 className="game-navbar-title ml-2 select-none">
                                Arcade
                            </h1>
                            <button
                                onClick={() => setGameActive(false)}
                                onKeyDown={handleKeyDownClose}
                                style={{
                                    background: "none",
                                    color: "inherit",
                                    border: "none",
                                    padding: 4,
                                    paddingRight: 8,
                                    font: "inherit",
                                    cursor: "pointer",
                                    outline: "inherit",
                                }}
                            >
                                <h1 className="game-navbar-close-text hover:text-accentTertiaryColor text-xl hover:scale-125 hover:transform">
                                    X
                                </h1>
                            </button>
                        </div>
                        <div
                            className="game-content bg-primaryColor border-accentSecondaryColor flex h-[400px] w-[500px] flex-col items-center justify-center border-2 border-solid p-2"
                            style={{
                                borderBottomLeftRadius: "10px",
                                borderBottomRightRadius: "10px",
                            }}
                        >
                            <p className="text-lg">
                                The arcade is currently unavailable
                            </p>
                        </div>
                    </div>
                </Draggable>
            )}
        </div>
    );
};

const MemoizedMyArcade = React.memo(MyArcade);
export default MemoizedMyArcade;
