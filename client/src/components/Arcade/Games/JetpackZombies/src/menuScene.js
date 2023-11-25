import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
	constructor() {
		super("MenuScene");

		this.hasClickedStart = false;
	}

	init(data) {
		this.score = data.score;
		console.log(this.score);
		if (this.score == undefined) {
			this.score = 0;
			this.scoreBoard = this.add.text(
				this.game.config.width / 2,
				this.game.config.height / 2 + 80,
				"Highscore: 0",
				{
					fontFamily: "Arial",
					fontSize: 14,
					color: "#ffffff",
				}
			);
			this.scoreBoard.setText("Highscore: " + this.score);
			this.scoreBoard.setOrigin(0.5, 0.5);
			this.scoreBoard.setDepth(1);
		} else {
			this.scoreBoard = this.add.text(
				this.game.config.width / 2,
				this.game.config.height / 2 + 80,
				"Highscore: 0",
				{
					fontFamily: "Arial",
					fontSize: 14,
					color: "#ffffff",
				}
			);
			this.scoreBoard.setText("Highscore: " + this.score);
			this.scoreBoard.setOrigin(0.5, 0.5);
			this.scoreBoard.setDepth(1);
		}

		this.name = data.name;
		if (this.name != undefined) {
			this.nameText = this.add.text(
				this.game.config.width / 2,
				this.game.config.height / 2 + 100,
				"Name: ",
				{
					fontFamily: "Arial",
					fontSize: 14,
					color: "#ffffff",
				}
			);
			this.nameText.setText("Name: " + this.name);
			this.nameText.setOrigin(0.5, 0.5);
			this.nameText.setDepth(1);
		}
	}

	preload() {
		this.load.image("start", "./assets/StartPink.png");
		this.load.image("tutorial", "./assets/Tutorial2.png");
		this.load.image("notification", "./assets/Notification.png");
		this.load.image("close", "./assets/Close.png");
		this.load.audio("backgroundMusic", "./assets/background-music.mp3");
		this.load.image("title", "./assets/jetpackZombies.png");
	}

	create() {
		this.backgroundMusic = this.sound.add("backgroundMusic", {
			volume: 0.15,
			loop: true,
		});
		this.backgroundMusic.play();

		this.notification = this.add.image(
			this.game.config.width / 2,
			this.game.config.height / 2,
			"notification"
		);
		this.notification.setVisible(false);
		this.notification.setDepth(1);

		this.closeNotification = this.add.image(
			this.game.config.width / 2 + this.notification.width / 2,
			this.game.config.height / 2 - this.notification.height / 2,
			"close"
		);
		this.closeNotification.setVisible(false);
		this.closeNotification.setDepth(2);

		this.start = this.add.image(
			this.game.config.width / 2,
			this.game.config.height / 2,
			"start"
		);
		this.start.y -= this.start.height / 1.5;
		this.start.setInteractive();
		this.start.on("pointerdown", () => {
			// if (this.hasClickedStart) {

			// }
			this.notification.setVisible(true);
			this.closeNotification.setVisible(true);

			this.closeNotification.setInteractive();
			this.closeNotification.on("pointerdown", () => {
				this.notification.setVisible(false);
				this.closeNotification.setVisible(false);
			});
			// this.scene.start("LevelOneScene");
		});

		this.tutorial = this.add.image(
			this.game.config.width / 2,
			this.game.config.height / 2,
			"tutorial"
		);
		this.tutorial.y += this.tutorial.height / 2;
		this.tutorial.setInteractive();
		this.tutorial.on("pointerdown", () => {
			this.scene.start("LevelOneScene", {
				score: this.score,
				name: this.name,
			});
		});

		this.title = this.add.image(
			this.game.config.width / 2,
			this.game.config.height / 2,
			"title"
		);
		this.title.y -= this.title.height * 5;
		this.title.setDepth(1);
		this.title.setScale(1.5);
	}

	update(time, delta) {}
}
