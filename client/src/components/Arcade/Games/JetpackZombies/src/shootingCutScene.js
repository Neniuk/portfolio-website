import Phaser from "phaser";

const assetPath = "/gameAssets/JetpackZombies/";

const projectileSpeed = 200;

export default class ShootingCutScene extends Phaser.Scene {
	constructor() {
		super("ShootingCutScene");
	}

	init(data) {
		this.score = data.score;
		if (this.score == undefined) {
			this.score = 0;
		}
		this.name = data.name;
		if (this.name == undefined) {
			this.name = "";
		}
	}

	preload() {
		// Sprite sheets
		this.load.spritesheet("explosion", assetPath + "ExplosionBig2.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.spritesheet(
			"innocentChild",
			assetPath + "InnocentChild2.png",
			{
				frameWidth: 25,
				frameHeight: 28,
			}
		);
		this.load.spritesheet("player", assetPath + "PlayerSheet2.png", {
			frameWidth: 22,
			frameHeight: 28,
		});

		// Images
		this.load.image("projectile", assetPath + "GreenProjectileSmall.png");
		this.load.image("background", assetPath + "Background.png");
		this.load.image("innerbackground", assetPath + "InnerBackground.png");
		this.load.image("outerbackground", assetPath + "OuterBackground.png");
		this.load.image("topouter", assetPath + "TopOuter.png");
		this.load.image("bottomouter", assetPath + "BottomOuter.png");
		this.load.image("leftouter", assetPath + "LeftOuter.png");
		this.load.image("rightouter", assetPath + "RightOuter.png");
		this.load.image("blood", assetPath + "Blood.png");
		this.load.image("amazingtron", assetPath + "amazingtron9001.png");

		// Audio
		this.load.audio("explosionSound", [
			assetPath + "explosion.mp3",
			assetPath + "explosion.ogg",
		]);
	}

	create() {
		// Audio
		this.explosionSound = this.sound.add("explosionSound");

		// Backgrounds
		this.innerbackground = this.add.image(0, 0, "innerbackground");
		this.innerbackground.setScale(2);
		this.innerbackground.setOrigin(0, 0);

		// Amazingtron-9000
		this.amazingtron = this.physics.add.sprite(
			this.game.config.width - 42,
			this.game.config.height - 63,
			"amazingtron"
		);
		this.amazingtron.setScale(2);
		this.amazingtron.setDepth(5);

		// Speechbox
		this.speechbox = this.physics.add.sprite(
			0 + 35,
			this.game.config.height - 88,
			"speechbox"
		);
		this.speechbox.setOrigin(0, 0);
		this.speechbox.setDepth(4);

		// Speech text
		this.welcomeText = this.add.text(
			0 + 47,
			this.game.config.height - 76,
			"I TOLD YOU TO WAIT!!! Omg... \nYou just murdered that innocent child... \n...",
			{
				fontFamily: "Arial",
				fontSize: 12,
				color: "#000000",
			}
		);
		this.welcomeText.setDepth(5);

		// For the corners
		this.outerbackground = this.physics.add.image(0, 0, "outerbackground");
		this.outerbackground.setScale(2);
		this.outerbackground.setOrigin(0, 0);

		// Outer walls
		this.outerwalls = this.physics.add.group({
			immovable: true,
			allowGravity: false,
		});

		this.topouter = this.physics.add.image(0, 0, "topouter");
		this.topouter.setScale(2);
		this.topouter.setOrigin(0, 0);
		//this.topouter.setImmovable(true);
		this.outerwalls.add(this.topouter);

		this.bottomouter = this.physics.add.image(0, 0, "bottomouter");
		this.bottomouter.setScale(2);
		this.bottomouter.setOrigin(0, 0);
		this.bottomouter.setPosition(
			0,
			this.game.config.height - this.bottomouter.height * 2
		);
		//this.bottomouter.setImmovable(true);
		this.outerwalls.add(this.bottomouter);

		this.leftouter = this.physics.add.image(1, 0, "leftouter");
		this.leftouter.setScale(2);
		this.leftouter.setOrigin(0, 0);
		//this.leftouter.setImmovable(true);
		this.outerwalls.add(this.leftouter);

		this.rightouter = this.physics.add.image(0, 0, "rightouter");
		this.rightouter.setScale(2);
		this.rightouter.setOrigin(0, 0);
		this.rightouter.setPosition(
			this.game.config.width - this.rightouter.width * 2,
			0
		);
		//this.rightouter.setImmovable(true);
		this.outerwalls.add(this.rightouter);

		// Child
		this.child = this.physics.add.sprite(
			this.game.config.width / 2,
			this.game.config.height / 2,
			"innocentChild"
		);
		//this.child.setScale(2);

		// Projectile
		this.testProjectile = this.physics.add.sprite(-32, 160, "projectile");
		this.testProjectile.setVelocityX(projectileSpeed);
		this.testProjectile.setOrigin(0.5, 0.5);

		// Overlaps and colliders
		this.physics.add.overlap(
			this.testProjectile,
			this.child,
			(projectile, child) => {
				projectile.destroy();
				this.child.setTexture("blood");
				this.explosionSprite = this.add.sprite(
					this.child.x,
					this.child.y
				);
				this.explosionSprite.anims.play("explosionAnimation", true);
				this.explosionSound.play();

				this.explosionSprite.on("animationcomplete", () => {
					this.explosionSprite.destroy();
					this.child.setVisible(true);
					//this.scene.restart();

					console.log("Waiting for 5 seconds");
					setTimeout(() => {
						this.child.destroy();
						this.scene.start("LevelTwoScene", {
							frozen: false,
							score: this.score,
							name: this.name,
						});
					}, 5000);
					// this.child.destroy();
					// this.scene.start("LevelOneScene", {frozen: false});
				});
			}
		);

		// Animations
		this.explosion = this.add.sprite(240, 160);
		this.anims.create({
			key: "explosionAnimation",
			frames: this.anims.generateFrameNumbers("explosion"),
			frameRate: 10,
			//repeat: -1
		});
	}

	update(time, delta) {}
}
