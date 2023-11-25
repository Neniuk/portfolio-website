import Phaser from "phaser";
import React, { useEffect } from "react";
import gameConfig from "./src/index";

let game;

const PongGame = () => {
	useEffect(() => {
		game = new Phaser.Game(gameConfig);

		return () => {
			if (game) {
				game.destroy(true);
				console.log("Pong game destroyed");
			}
		};
	}, []);

	return <div id={gameConfig.parent} />;
};

export default PongGame;
