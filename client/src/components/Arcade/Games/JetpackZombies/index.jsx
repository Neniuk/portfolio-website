import Phaser from "phaser";
import React, { useEffect } from "react";
import gameConfig from "./src/index";

let game;

const JetpackZombiesGame = () => {
	useEffect(() => {
		game = new Phaser.Game(gameConfig);

		return () => {
			game.destroy(true);
			console.log("Game closed");
		};
	}, []);

	return <div id={gameConfig.parent} />;
};

export default React.memo(JetpackZombiesGame);
