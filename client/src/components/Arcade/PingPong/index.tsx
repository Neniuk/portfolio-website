import React from "react";

const PingPong: React.FC = () => {
    return (
        <div>
            <canvas
                id="ping-pong-canvas"
                width="800"
                height="600"
                style={{
                    border: "1px solid black",
                    display: "block",
                    margin: "auto",
                }}
            ></canvas>
        </div>
    );
};

export default PingPong;
