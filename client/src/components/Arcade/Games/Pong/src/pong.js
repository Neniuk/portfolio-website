import Phaser from "phaser";

const paddleSpeed = 200;
const ballSpeed = 200;
const ballBounceSpeed = 1.05;

const scale = 0.2;

export default class Pong extends Phaser.Scene {
	constructor() {
		super("pong");
	}

	init(data) {
		this.scoreLeft = 0;
		this.setScoreLeft = 0;

		this.scoreRight = 0;
		this.setScoreRight = 0;
	}

	preload() {
		this.load.image("ball", "/gameAssets/Pong/pong-ball-2.png");
		this.load.image("paddle", "/gameAssets/Pong/pong-paddle-2.png");
	}

	create() {
		// Create Elements
		this.ball = this.physics.add
			.sprite(
				this.physics.world.bounds.centerX,
				this.physics.world.bounds.centerY,
				"ball"
			)
			.setCollideWorldBounds(true)
			.setBounce(ballBounceSpeed)
			.setScale(scale);

		this.paddleLeft = this.physics.add
			.sprite(10, this.physics.world.bounds.centerY, "paddle")
			.setCollideWorldBounds(true)
			.setImmovable(true)
			.setScale(scale);

		this.paddleRight = this.physics.add
			.sprite(
				this.physics.world.bounds.width - 10,
				this.physics.world.bounds.centerY,
				"paddle"
			)
			.setCollideWorldBounds(true)
			.setImmovable(true)
			.setScale(scale);

		// Score Text
		this.scoreLeftText = this.add
			.text(
				this.physics.world.bounds.width / 2 - 64,
				24,
				this.scoreLeft,
				{
					fontSize: "32px",
					fill: "#808080",
					fontFamily: "Courier",
				}
			)
			.setOrigin(0.5);

		this.scoreRightText = this.add
			.text(
				this.physics.world.bounds.width / 2 + 64,
				24,
				this.scoreRight,
				{
					fontSize: "32px",
					fill: "#808080",
					fontFamily: "Courier",
				}
			)
			.setOrigin(0.5);

		// Set Score Text
		this.setScoreLeftText = this.add
			.text(
				this.physics.world.bounds.width / 2 - 96,
				48,
				this.setScoreLeft,
				{
					fontSize: "16px",
					fill: "#808080",
					fontFamily: "Courier",
				}
			)
			.setOrigin(0.5);

		this.setScoreRightText = this.add
			.text(
				this.physics.world.bounds.width / 2 + 96,
				48,
				this.setScoreRight,
				{
					fontSize: "16px",
					fill: "#808080",
					fontFamily: "Courier",
				}
			)
			.setOrigin(0.5);

		// Element Depths
		this.ball.setDepth(1);

		this.scoreLeftText.setDepth(0);
		this.scoreRightText.setDepth(0);

		this.setScoreLeftText.setDepth(0);
		this.setScoreRightText.setDepth(0);

		// Colliders
		this.physics.add.collider(this.ball, this.paddleLeft);
		this.physics.add.collider(this.ball, this.paddleRight);

		// Ball Velocity
		this.ball.setVelocityX(-ballSpeed);
		this.ball.setVelocityY(ballSpeed);

		// Input Keys
		this.keys = this.input.keyboard.addKeys({
			space: Phaser.Input.Keyboard.KeyCodes.SPACE,
			upArrow: Phaser.Input.Keyboard.KeyCodes.UP,
			downArrow: Phaser.Input.Keyboard.KeyCodes.DOWN,
			leftArrow: Phaser.Input.Keyboard.KeyCodes.LEFT,
			rightArrow: Phaser.Input.Keyboard.KeyCodes.RIGHT,
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D,
		});
	}

	update() {
		// Left Paddle Movement
		if (this.keys.up.isDown) {
			this.paddleLeft.body.setVelocityY(-paddleSpeed);
		} else if (this.keys.down.isDown) {
			this.paddleLeft.body.setVelocityY(paddleSpeed);
		} else {
			this.paddleLeft.body.setVelocityY(0);
		}

		// Right Paddle Movement
		if (this.keys.upArrow.isDown) {
			this.paddleRight.body.setVelocityY(-paddleSpeed);
		} else if (this.keys.downArrow.isDown) {
			this.paddleRight.body.setVelocityY(paddleSpeed);
		} else {
			this.paddleRight.body.setVelocityY(0);
		}

		// Ball Movement
		if (this.ball.body.velocity.x === 0) {
			this.ball.setVelocityX(ballSpeed);
		}

		// Score
		if (this.ball.x - (this.ball.width * this.ball.scaleX) / 2 <= 0) {
			this.ball.setPosition(
				this.physics.world.bounds.centerX,
				this.physics.world.bounds.centerY
			);

			this.scoreRight++;
			// console.log("Score Right: " + this.scoreRight);

			this.ball.setVelocityX(ballSpeed);
			this.ball.setVelocityY(ballSpeed);
		} else if (
			this.ball.x + (this.ball.width * this.ball.scaleX) / 2 >=
			this.physics.world.bounds.width
		) {
			this.ball.setPosition(
				this.physics.world.bounds.centerX,
				this.physics.world.bounds.centerY
			);

			this.scoreLeft++;
			// console.log("Score Left: " + this.scoreLeft);

			this.ball.setVelocityX(-ballSpeed);
			this.ball.setVelocityY(ballSpeed);
		}

		// Score Text
		this.scoreLeftText.setText(this.scoreLeft);
		this.scoreRightText.setText(this.scoreRight);

		// Set Score Text
		this.setScoreLeftText.setText(this.setScoreLeft);
		this.setScoreRightText.setText(this.setScoreRight);

		// Game Over
		if (this.scoreLeft === 5) {
			this.setScoreLeft++;

			this.scoreLeft = 0;
			this.scoreRight = 0;
		} else if (this.scoreRight === 5) {
			this.setScoreRight++;

			this.scoreLeft = 0;
			this.scoreRight = 0;
		}
	}
}
