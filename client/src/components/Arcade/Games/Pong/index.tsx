import React, { useEffect } from "react";
import Pong from "./pong";

const PongGame: React.FC = () => {
    useEffect(() => {
        const canvas: HTMLCanvasElement = document.getElementById(
            "pong"
        ) as HTMLCanvasElement;
        let pongGame: Pong | null = null;

        if (canvas) {
            pongGame = new Pong(canvas);
            pongGame.start();
        }

        return () => {
            if (pongGame) {
                pongGame.stop();
                pongGame = null;
            }
        };
    }, []);

    return (
        <div className="border-2 border-solid border-white">
            <canvas id="pong" width="480" height="320"></canvas>
        </div>
    );
};

const MemoizedPongGame = React.memo(PongGame);
export default MemoizedPongGame;
