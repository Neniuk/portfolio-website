import Phaser from "phaser";

// Reference: Lecture videos
// Reference: My own assignment for Week 7 of this course

// Attribution for background-music.mp3:
// Song: Lensko - Let's Go! [NCS Release]
// Music provided by NoCopyrightSounds
// Free Download/Stream: http://ncs.io/letsgo
// Watch: http://youtu.be/mSLuJYtl89Y

// Attribution for explosion.mp3 & explosion.ogg:
// Sound:  Boom (Retro video game SFX) » Boom_C_01
// Author:  cabled_mess
// Source: https://freesound.org/people/cabled_mess/sounds/350976/
// License: https://creativecommons.org/publicdomain/zero/1.0/

// Attribution for laser.mp3 & laser.ogg:
// Sound: Laser
// Author: swag1773
// Source: https://freesound.org/people/swag1773/sounds/639625/
// License: https://creativecommons.org/publicdomain/zero/1.0/

import MenuScene from "./menuScene.js";
import LevelOneScene from "./levelOneScene.js";
import LevelTwoScene from "./levelTwoScene.js";
import ShootingCutScene from "./shootingCutScene.js";

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
    scene: [MenuScene, LevelOneScene, LevelTwoScene, ShootingCutScene],
    parent: "game-container",
};

// let game = new Phaser.Game(gameConfig);

export default gameConfig;
