import Phaser from "phaser";

export default class Pong extends Phaser.Scene {
	constructor() {
		super("pong");
	}

	preload() {
		this.load.image("ball", "assets/pong/ball.png");
		this.load.image("paddle", "assets/pong/paddle.png");
	}

	create() {
		this.ball = this.physics.add
			.sprite(
				this.physics.world.bounds.centerX,
				this.physics.world.bounds.centerY,
				"ball"
			)
			.setCollideWorldBounds(true)
			.setBounce(1);

		this.paddle1 = this.physics.add
			.sprite(10, this.physics.world.bounds.centerY, "paddle")
			.setCollideWorldBounds(true)
			.setImmovable(true);

		this.paddle2 = this.physics.add
			.sprite(
				this.physics.world.bounds.width - 10,
				this.physics.world.bounds.centerY,
				"paddle"
			)
			.setCollideWorldBounds(true)
			.setImmovable(true);

		this.physics.add.collider(this.ball, this.paddle1);
		this.physics.add.collider(this.ball, this.paddle2);

		this.ball.setVelocityX(-100);
		this.ball.setVelocityY(100);
	}

	update() {
		this.paddle1.y = this.input.y;

		if (this.ball.x <= 0) {
			this.ball.setPosition(
				this.physics.world.bounds.centerX,
				this.physics.world.bounds.centerY
			);
			this.ball.setVelocityX(100);
			this.ball.setVelocityY(100);
		}

		if (this.ball.x >= this.physics.world.bounds.width) {
			this.ball.setPosition(
				this.physics.world.bounds.centerX,
				this.physics.world.bounds.centerY
			);
			this.ball.setVelocityX(-100);
			this.ball.setVelocityY(100);
		}
	}
}
