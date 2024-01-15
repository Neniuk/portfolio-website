import Phaser from "phaser";
import Pong from "./pong.js";

let gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: "#000000",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 480,
        height: 320,
    },
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            // debug: true,
            gravity: {
                y: 0,
            },
        },
    },
    scene: [Pong],
    parent: "game-container",
};

// let game = new Phaser.Game(gameConfig);

export default gameConfig;
