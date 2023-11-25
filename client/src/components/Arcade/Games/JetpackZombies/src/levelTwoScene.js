import Phaser from "phaser";

const playerSpeed = 100;
const projectileSpeed = 200;
const projectileCooldown = 1500;
const enemySpawnTime = 1000;
const enemySpeed = playerSpeed / 4;
const itemSpawnChance = 25;
const bossSpawnCounter = 20;
const hallowedShots = 10;
const holySpeed = 300;
const holyCooldown = 800;
const holyNumber = 42;
const playerHealth = 3;
let health = 3;
const timeUntilFloorFall = 15000;
let floorFallTimer = 0;

const assetPath = "/gameAssets/JetpackZombies/";

export default class LevelTwoScene extends Phaser.Scene {
	constructor() {
		super("LevelTwoScene");
	}

	init(data) {
		this.highscore = data.score;
		if (this.highscore == undefined) {
			this.highscore = 0;
		}
		this.name = data.name;
		if (this.name == undefined) {
			this.name = "";
		}
	}

	preload() {
		// Sprite Sheets
		this.load.spritesheet("explosion", assetPath + "ExplosionBig2.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.spritesheet("player", assetPath + "PlayerSheet2.png", {
			frameWidth: 22,
			frameHeight: 28,
		});
		this.load.spritesheet(
			"hallowedGround",
			assetPath + "HallowedGround.png",
			{
				frameWidth: 227,
				frameHeight: 131,
			}
		);

		// Images
		this.load.image("playerRight", assetPath + "PlayerRight.png");
		this.load.image("projectile", assetPath + "GreenProjectileSmall.png");
		this.load.image("innerbackground", assetPath + "InnerBackground.png");
		this.load.image("outerbackground", assetPath + "OuterBackground.png");
		this.load.image("topouter", assetPath + "TopOuter.png");
		this.load.image("bottomouter", assetPath + "BottomOuter.png");
		this.load.image("leftouter", assetPath + "LeftOuter.png");
		this.load.image("rightouter", assetPath + "RightOuter.png");
		this.load.image("amazingtron", assetPath + "amazingtron9001.png");
		this.load.image("speechbox", assetPath + "speechbox.png");
		this.load.image("item", assetPath + "Blood.png");
		this.load.image("hallowedItem", assetPath + "discoball.png");
		this.load.image("hallowedShot", assetPath + "Projectile.png");
		this.load.image("darkHole", assetPath + "dark-hole.png");
		this.load.image("enemy", assetPath + "zombie.png");
		this.load.image("jetpackEnemy", assetPath + "jetpack-zombie.png");

		// Audio
		this.load.audio("laserSound", [
			assetPath + "laser.mp3",
			assetPath + "laser.ogg",
		]);
	}

	create() {
		// Sound
		// Reference: https://stackoverflow.com/questions/51601926/how-to-set-volume-in-phaser-3
		this.laserSound = this.sound.add("laserSound", { volume: 0.5 });

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
			"You can move using either <WASD> or the <ARROW> keys. \nNow aim at those jetpack zombies with your <MOUSE> \nand press <SPACE> to shoot.",
			{
				fontFamily: "Arial",
				fontSize: 12,
				color: "#000000",
			}
		);
		this.welcomeText.setDepth(5);

		this.time.delayedCall(
			10000,
			() => {
				this.welcomeText.setText(
					"The middle of the floor will fall out in 5 seconds. \nWatch out!"
				);
			},
			null,
			this
		);

		// Reference: https://stackoverflow.com/questions/54630495/phaser-how-to-use-a-simple-timer-from-0-to-3
		this.time.delayedCall(
			15000,
			() => {
				this.amazingtron.destroy();
				this.speechbox.destroy();
				this.welcomeText.destroy();
			},
			null,
			this
		);

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

		// Player
		this.player = this.physics.add.sprite(
			this.game.config.width / 2,
			this.game.config.height / 2,
			"player"
		);

		// Reference: https://stackoverflow.com/questions/38521869/phaser-js-colliding-with-world-bounds
		// this.player.body.setCollideWorldBounds(true);
		this.player.depth = 1;
		this.score = 0;
		this.bossCounter = 0;

		this.healthText = this.add.text(10, 10, "Health: " + health, {
			fontFamily: "Arial",
			fontSize: 14,
			color: "#ffffff",
		});

		this.healthText.setDepth(3);

		this.scoreText = this.add.text(10, 90, "Score: " + this.score, {
			fontFamily: "Arial",
			fontSize: 14,
			color: "#ffffff",
		});

		this.scoreText.setDepth(3);

		// Reference: From my assignment from week7 (Mattias Slotte)
		// Enemies
		this.enemyTimer = enemySpawnTime;
		this.enemies = this.physics.add.group();
		this.bosses = this.physics.add.group();

		// Reference: https://phaser.discourse.group/t/how-to-deal-with-framerate-drop/8085
		this.spawnEnemy = function (delta) {
			if (this.enemyTimer <= 0) {
				this.enemyTimer = enemySpawnTime;

				const spawnArea = {
					top: -35,
					bottom: 320 + 35,
					left: -24,
					right: 480 + 24,
				};

				// Choose a random side from which the enemy should enter the screen.
				const side = Phaser.Math.Between(0, 3); // 0: top, 1: bottom, 2: left, 3: right

				let randomX, randomY;

				switch (side) {
					case 0: // Top
						randomX = Phaser.Math.Between(0, 320);
						randomY = spawnArea.top;
						break;
					case 1: // Bottom
						randomX = Phaser.Math.Between(0, 320);
						randomY = spawnArea.bottom;
						break;
					case 2: // Left
						randomX = spawnArea.left;
						randomY = Phaser.Math.Between(0, 480);
						break;
					case 3: // Right
						randomX = spawnArea.right;
						randomY = Phaser.Math.Between(0, 480);
						break;
				}

				// let enemySpawnX = Phaser.Math.Between(spawnArea.x, spawnArea.width);
				// let enemySpawnY = Phaser.Math.Between(spawnArea.y, spawnArea.height);

				let enemy = this.physics.add.sprite(
					randomX,
					randomY,
					"jetpackEnemy"
				);
				//enemy.setOrigin(0, 0);
				enemy.setDepth(3);
				this.enemies.add(enemy);

				// let targetAngle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y)
				// console.log(targetAngle);

				// enemy.setRotation(targetAngle);
				this.physics.moveTo(
					enemy,
					this.player.x,
					this.player.y,
					enemySpeed
				);
			}
			this.enemyTimer -= delta;
		};

		this.spawnBoss = () => {
			this.bossCounter = 0;
			const spawnArea = {
				top: -70,
				bottom: 320 + 70,
				left: -48,
				right: 480 + 48,
			};

			// Choose a random side from which the enemy should enter the screen.
			const side = Phaser.Math.Between(0, 3); // 0: top, 1: bottom, 2: left, 3: right

			let randomX, randomY;

			switch (side) {
				case 0: // Top
					randomX = Phaser.Math.Between(0, 320);
					randomY = spawnArea.top;
					break;
				case 1: // Bottom
					randomX = Phaser.Math.Between(0, 320);
					randomY = spawnArea.bottom;
					break;
				case 2: // Left
					randomX = spawnArea.left;
					randomY = Phaser.Math.Between(0, 480);
					break;
				case 3: // Right
					randomX = spawnArea.right;
					randomY = Phaser.Math.Between(0, 480);
					break;
			}

			// let enemySpawnX = Phaser.Math.Between(spawnArea.x, spawnArea.width);
			// let enemySpawnY = Phaser.Math.Between(spawnArea.y, spawnArea.height);

			let enemy = this.physics.add.sprite(
				randomX,
				randomY,
				"jetpackEnemy"
			);
			//enemy.setOrigin(0, 0);
			enemy.setDepth(3);
			enemy.setScale(2);
			enemy.enemyClass = "boss";

			this.enemies.add(enemy);
			this.bosses.add(enemy);

			// let targetAngle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y)
			// console.log(targetAngle);

			// enemy.setRotation(targetAngle);
			this.physics.moveTo(
				enemy,
				this.player.x,
				this.player.y,
				enemySpeed * 0.75
			);
		};

		// Reference: https://stackoverflow.com/questions/67708864/how-do-i-make-it-so-an-enemy-sprite-follows-the-player-sprite-in-phaser-3
		this.enemyFollowPlayer = () => {
			this.enemies.getChildren().forEach((enemy) => {
				// let targetAngle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y);
				// enemy.setRotation(targetAngle);
				this.physics.moveTo(
					enemy,
					this.player.x,
					this.player.y,
					enemySpeed
				);
			});
		};

		// Projectiles
		this.projectiles = this.physics.add.group();
		this.hallowedProjectiles = this.physics.add.group();

		this.projectileTimer = projectileCooldown;
		this.projectileChargeText = this.add.text(
			10,
			30,
			"Laser Charge (<SPACE>): 0%",
			{
				fontFamily: "Arial",
				fontSize: 14,
				color: "#ffffff",
			}
		);

		this.projectileChargeText.setDepth(3);

		this.projectileCharge = function (delta) {
			let charge = Math.floor(this.projectileTimer);
			if (charge < 0) {
				charge = 0;
			}
			let chargeText =
				Math.floor((charge / projectileCooldown) * 100) + "%";
			if (Math.floor((charge / projectileCooldown) * 100) >= 100) {
				chargeText = "100%";
			}
			this.projectileChargeText.setText(
				"Laser Charge (<SPACE>): " + chargeText
			);

			if (this.projectileTimer >= projectileCooldown) {
				return true;
			}
			this.projectileTimer += delta;
			return false;
		};

		this.shootProjectile = (delta) => {
			let projectile = this.physics.add.sprite(
				this.player.x,
				this.player.y,
				"projectile"
			);
			this.projectiles.add(projectile);
			projectile.setOrigin(0.5, 0.5);
			projectile.setDepth(2);

			// Reference: https://www.html5gamedevs.com/topic/38533-angle-to-mouse-pointer-on-phaser-3/
			let targetAngle = Phaser.Math.Angle.Between(
				this.player.x,
				this.player.y,
				this.game.input.mousePointer.x + this.cameras.main.scrollX,
				this.game.input.mousePointer.y + this.cameras.main.scrollY
			);
			console.log(targetAngle);

			projectile.setRotation(targetAngle);
			this.physics.moveTo(
				projectile,
				this.game.input.mousePointer.x,
				this.game.input.mousePointer.y,
				projectileSpeed
			);

			this.projectileTimer = 0;

			this.laserSound.play();
		};

		this.hallowedTimer = holyCooldown;
		this.hallowedCharge = (delta) => {
			if (this.hallowedTimer >= holyCooldown) {
				return true;
			} else {
				this.hallowedTimer += delta;
				return false;
			}
		};

		this.shootHallowedShot = () => {
			// let targetEnemy = this.physics.closest(this.player, this.enemies);
			// console.log(targetEnemy);

			// if (targetEnemy === null) {
			//     console.log("No enemies");
			//     return;
			// }
			let tempGroup = this.physics.add.group();

			let hallowedShot1 = this.physics.add.sprite(
				this.player.x,
				this.player.y,
				"hallowedShot"
			);
			tempGroup.add(hallowedShot1);
			this.hallowedProjectiles.add(hallowedShot1);
			let hallowedShot2 = this.physics.add.sprite(
				this.player.x,
				this.player.y,
				"hallowedShot"
			);
			tempGroup.add(hallowedShot2);
			this.hallowedProjectiles.add(hallowedShot2);
			let hallowedShot3 = this.physics.add.sprite(
				this.player.x,
				this.player.y,
				"hallowedShot"
			);
			tempGroup.add(hallowedShot3);
			this.hallowedProjectiles.add(hallowedShot3);
			let hallowedShot4 = this.physics.add.sprite(
				this.player.x,
				this.player.y,
				"hallowedShot"
			);
			tempGroup.add(hallowedShot4);
			this.hallowedProjectiles.add(hallowedShot4);
			let hallowedShot5 = this.physics.add.sprite(
				this.player.x,
				this.player.y,
				"hallowedShot"
			);
			tempGroup.add(hallowedShot5);
			this.hallowedProjectiles.add(hallowedShot5);
			let hallowedShot6 = this.physics.add.sprite(
				this.player.x,
				this.player.y,
				"hallowedShot"
			);
			tempGroup.add(hallowedShot6);
			this.hallowedProjectiles.add(hallowedShot6);
			let hallowedShot7 = this.physics.add.sprite(
				this.player.x,
				this.player.y,
				"hallowedShot"
			);
			tempGroup.add(hallowedShot7);
			this.hallowedProjectiles.add(hallowedShot7);
			let hallowedShot8 = this.physics.add.sprite(
				this.player.x,
				this.player.y,
				"hallowedShot"
			);
			tempGroup.add(hallowedShot8);
			this.hallowedProjectiles.add(hallowedShot8);

			let angle = 0;
			tempGroup.getChildren().forEach((hallowedShot) => {
				hallowedShot.setOrigin(0.5, 0.5);
				hallowedShot.setScale(2);
				hallowedShot.setDepth(2);
				hallowedShot.setRotation(angle);
				angle += 45;
			});

			hallowedShot1.setVelocityX(0);
			hallowedShot1.setVelocityY(holySpeed);

			hallowedShot2.setVelocityX(holySpeed / 2);
			hallowedShot2.setVelocityY(holySpeed / 2);

			hallowedShot3.setVelocityX(holySpeed);
			hallowedShot3.setVelocityY(0);

			hallowedShot4.setVelocityX(holySpeed / 2);
			hallowedShot4.setVelocityY(-holySpeed / 2);

			hallowedShot5.setVelocityX(0);
			hallowedShot5.setVelocityY(-holySpeed);

			hallowedShot6.setVelocityX(-holySpeed / 2);
			hallowedShot6.setVelocityY(-holySpeed / 2);

			hallowedShot7.setVelocityX(-holySpeed);
			hallowedShot7.setVelocityY(0);

			hallowedShot8.setVelocityX(-holySpeed / 2);
			hallowedShot8.setVelocityY(holySpeed / 2);

			if (this.hallowedShotsLeft == 1) {
				floorFallTimer = 0;
			}

			this.hallowedShotsLeft -= 1;
			console.log(this.hallowedShotsLeft);

			this.hallowedTimer = 0;
		};

		// Items
		this.hallowedItems = this.physics.add.group();
		this.items = this.physics.add.group();
		this.hallowedGrounds = this.physics.add.group();

		// Overlaps and Colliders
		this.spawnItem = (enemyX, enemyY) => {
			let item = this.physics.add.sprite(enemyX, enemyY, "item");
			this.items.add(item);
			console.log("Item spawned");
			item.setDepth(3);

			// Reference: https://stackoverflow.com/questions/54630495/phaser-how-to-use-a-simple-timer-from-0-to-3
			this.time.delayedCall(
				5000,
				() => {
					item.destroy();
				},
				null,
				this
			);
		};

		this.spawnHallowedItem = (enemyX, enemyY) => {
			let hallowedItem = this.physics.add.sprite(
				enemyX,
				enemyY,
				"hallowedItem"
			);
			this.hallowedItems.add(hallowedItem);
			console.log("Holy item spawned");
			hallowedItem.setDepth(3);

			// Reference: https://stackoverflow.com/questions/54630495/phaser-how-to-use-a-simple-timer-from-0-to-3
			this.time.delayedCall(
				5000,
				() => {
					hallowedItem.destroy();
				},
				null,
				this
			);
		};

		this.bossChargeText = this.add.text(
			10,
			50,
			"Boss spawn (DESTROY ENEMIES): 0/20",
			{
				fontFamily: "Arial",
				fontSize: 14,
				color: "#ffffff",
			}
		);

		this.bossChargeText.setDepth(3);

		this.darkholes = this.physics.add.group();
		this.floorsFall = () => {
			if (this.darkholes.getLength() > 0) {
				floorFallTimer = 0;
				return;
			}
			let darkhole = this.physics.add.sprite(
				this.game.config.width / 2,
				this.game.config.height / 2,
				"darkHole"
			);
			//darkhole.setDepth(1);
			this.darkholes.add(darkhole);
		};

		this.destroyEnemy = (enemy) => {
			let charge = this.bossCounter;
			if (charge < 0) {
				charge = 0;
			}
			let chargeText = charge + "/" + bossSpawnCounter;
			this.bossChargeText.setText(
				"Boss spawn (DESTROY ENEMIES): " + chargeText
			);

			let enemyX = enemy.x;
			let enemyY = enemy.y;

			let isBoss = enemy.enemyClass;

			let explosion = this.add.sprite(enemyX, enemyY);
			explosion.setDepth(3);
			let itemRoll = Phaser.Math.Between(0, 100);

			enemy.destroy();

			this.bossCounter += 1;

			if (itemRoll <= itemSpawnChance && isBoss !== "boss") {
				this.spawnItem(enemyX, enemyY);
			} else if (itemRoll === holyNumber && isBoss !== "boss") {
				// ((itemRoll === holyNumber) && (isBoss !== "boss"))
				this.spawnHallowedItem(enemyX, enemyY);
			} else if (isBoss === "boss" && itemRoll <= itemSpawnChance) {
				this.spawnHallowedItem(enemyX, enemyY);
			} else if (isBoss === "boss" && itemRoll > itemSpawnChance) {
				this.spawnItem(enemyX, enemyY);
			}

			explosion.anims.play("explosionAnimation");

			explosion.on("animationcomplete", () => {
				explosion.destroy();
			});
		};

		this.physics.add.overlap(
			this.items,
			this.darkholes,
			(item, darkhole) => {
				if (
					item.x > darkhole.x - 103 &&
					item.x < darkhole.x + 103 &&
					item.y > darkhole.y - 52 &&
					item.y < darkhole.y + 52
				) {
					item.destroy();
				}
			}
		);

		this.physics.add.overlap(
			this.hallowedItems,
			this.darkholes,
			(hallowedItem, darkhole) => {
				if (
					hallowedItem.x > darkhole.x - 103 &&
					hallowedItem.x < darkhole.x + 103 &&
					hallowedItem.y > darkhole.y - 52 &&
					hallowedItem.y < darkhole.y + 52
				) {
					hallowedItem.destroy();
				}
			}
		);

		this.physics.add.overlap(
			this.projectiles,
			this.enemies,
			(projectile, enemy) => {
				projectile.destroy();
				this.destroyEnemy(enemy);

				this.score += 1;
				console.log(this.score);
			}
		);

		this.physics.add.overlap(
			this.hallowedProjectiles,
			this.enemies,
			(hallowedProjectile, enemy) => {
				// hallowedProjectile.destroy();
				this.destroyEnemy(enemy);

				this.score += 1;
				console.log(this.score);
			}
		);

		this.physics.add.collider(this.player, this.outerwalls);

		this.physics.add.overlap(this.player, this.items, (player, item) => {
			item.destroy();

			if (health >= 3) {
				this.score += 1;
				console.log(this.score);
				return;
			}
			health += 1;
			console.log("Item collected");
			console.log(health);

			// Reference: https://www.html5gamedevs.com/topic/18254-spritetint-white-color-problem/
			this.player.tint = 0x00ff00;

			this.time.delayedCall(
				500,
				() => {
					// Reference: https://www.html5gamedevs.com/topic/18254-spritetint-white-color-problem/
					this.player.tint = 0xffffff;
				},
				null,
				this
			);
		});

		this.physics.add.overlap(
			this.player,
			this.darkholes,
			(player, darkhole) => {
				// If player sprite is over the darkhole, destroy the player
				if (
					player.x > darkhole.x - 103 &&
					player.x < darkhole.x + 103 &&
					player.y > darkhole.y - 52 &&
					player.y < darkhole.y + 52
				) {
					this.gameOver();
				}
				// this.gameOver();
			}
		);

		this.hallowedShotsLeft = 0;
		this.physics.add.overlap(
			this.player,
			this.hallowedItems,
			(player, hallowedItem) => {
				hallowedItem.destroy();

				if (this.darkholes.getLength() > 0) {
					this.darkholes.getChildren().forEach((darkhole) => {
						darkhole.destroy();
					});
				}

				let hallowedGround = this.physics.add.sprite(
					this.game.config.width / 2,
					this.game.config.height / 2,
					"hallowedGround"
				);

				let numOfHallowedGrounds = this.hallowedGrounds.getLength();

				this.hallowedGrounds.add(hallowedGround);
				console.log(
					"This land has been blessed, by the power of epic dance moves!"
				);
				hallowedGround.anims.play("hallowedGround");

				console.log("Hallowed grounds: " + numOfHallowedGrounds);
				if (numOfHallowedGrounds === 0) {
					this.enemies.getChildren().forEach((enemy) => {
						if (
							enemy.x > hallowedGround.x - 103 &&
							enemy.x < hallowedGround.x + 103 &&
							enemy.y > hallowedGround.y - 52 &&
							enemy.y < hallowedGround.y + 52
						) {
							enemy.destroy();
						}
					});
					this.player.x = this.game.config.width / 2;
					this.player.y = this.game.config.height / 2;
				}

				this.hallowedShotsLeft = hallowedShots;

				// this.time.delayedCall(10000, () => {
				//     hallowedGround.destroy();
				//     floorFallTimer = 0;
				//     console.log("Hallowed ground destroyed");
				//     console.log("Floor fall timer reset: " + floorFallTimer);

				//             // Speechbox
				//     let speechbox = this.physics.add.sprite(0 + 35, this.game.config.height - 88, "speechbox");
				//     speechbox.setOrigin(0, 0);
				//     speechbox.setDepth(4);

				//     // Speech text
				//     let welcomeText = this.add.text(0 + 47, this.game.config.height - 76, "Time until next floor fall 15s!", {
				//         fontFamily: "Arial",
				//         fontSize: 12,
				//         color: "#000000"
				//     });
				//     welcomeText.setDepth(5);

				//     this.time.delayedCall(5000, () => {
				//         speechbox.destroy();
				//         welcomeText.destroy();
				//     });

				// }, null, this);
			}
		);

		this.holyShotsText = this.add.text(10, 70, "Holy Shots (<H>): 0", {
			fontFamily: "Arial",
			fontSize: 14,
			color: "#ffffff",
		});

		this.holyShotsText.setDepth(3);

		this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
			let enemyClass = enemy.enemyClass;
			this.destroyEnemy(enemy);

			// Reference: https://www.html5gamedevs.com/topic/18254-spritetint-white-color-problem/
			this.player.tint = 0xff0000;

			if (enemyClass === "boss") {
				health -= 3;
				console.log("Killed by boss");
			} else {
				health -= 1;
				this.score += 1;
			}
			console.log(health);
			console.log(this.score);
			this.time.delayedCall(
				500,
				() => {
					// Reference: https://www.html5gamedevs.com/topic/18254-spritetint-white-color-problem/
					this.player.tint = 0xffffff;
				},
				null,
				this
			);
		});

		// Animations
		this.anims.create({
			key: "hallowedGround",
			frames: this.anims.generateFrameNumbers("hallowedGround"),
			frameRate: 10,
			repeat: -1,
		});

		this.explosion = this.add.sprite(240, 160);
		this.anims.create({
			key: "explosionAnimation",
			frames: this.anims.generateFrameNumbers("explosion"),
			frameRate: 10,
			//repeat: -1
		});

		this.anims.create({
			key: "right",
			frames: this.anims.generateFrameNumbers("player", {
				start: 2,
				end: 2,
			}),
			frameRate: 10,
			repeat: -1,
		});

		this.anims.create({
			key: "left",
			frames: this.anims.generateFrameNumbers("player", {
				start: 3,
				end: 3,
			}),
			frameRate: 10,
			repeat: -1,
		});

		this.anims.create({
			key: "up",
			frames: this.anims.generateFrameNumbers("player", {
				start: 1,
				end: 1,
			}),
			frameRate: 10,
			repeat: -1,
		});

		this.anims.create({
			key: "down",
			frames: this.anims.generateFrameNumbers("player", {
				start: 0,
				end: 0,
			}),
			frameRate: 10,
			repeat: -1,
		});

		// Game Over
		this.gameOver = () => {
			health = playerHealth;
			floorFallTimer = 0;

			// Stop music
			// Reference: https://phaser.discourse.group/t/how-do-i-start-music-in-one-scene-and-stop-it-in-another/6032/6
			this.sound.stopByKey("backgroundMusic");
			if (this.score > this.highscore) {
				this.highscore = this.score;

				this.name = prompt("You got a new highscore! Enter your name:");
				if (this.name == null) {
					this.name = "Anonymous";
				}
			}

			this.scene.start("MenuScene", {
				score: this.highscore,
				name: this.name,
			});
		};

		// Input Keys
		// Reference: https://newdocs.phaser.io/docs/3.54.0/focus/Phaser.Input.Keyboard.KeyboardPlugin-addKeys
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
			holyKey: Phaser.Input.Keyboard.KeyCodes.H,
		});
	}

	update(time, delta) {
		// Player Movement
		if (
			(this.keys.left.isDown || this.keys.leftArrow.isDown) &&
			!this.frozen
		) {
			this.player.body.setVelocityX(-playerSpeed);
			this.player.anims.play("left", true);
		} else if (
			(this.keys.right.isDown || this.keys.rightArrow.isDown) &&
			!this.frozen
		) {
			this.player.body.setVelocityX(playerSpeed);
			this.player.anims.play("right", true);
		} else {
			this.player.body.setVelocityX(0);
		}

		if ((this.keys.up.isDown || this.keys.upArrow.isDown) && !this.frozen) {
			this.player.body.setVelocityY(-playerSpeed);
			this.player.anims.play("up", true);
		} else if (
			(this.keys.down.isDown || this.keys.downArrow.isDown) &&
			!this.frozen
		) {
			this.player.body.setVelocityY(playerSpeed);
			this.player.anims.play("down", true);
		} else {
			this.player.body.setVelocityY(0);
		}

		// Player Shooting
		if (this.projectileCharge(delta) && this.keys.space.isDown) {
			this.shootProjectile(delta);
		}

		// Check if projectiles are within the bounds of the screen
		this.projectiles.getChildren().forEach((projectile) => {
			if (
				projectile.x < 0 ||
				projectile.x > this.game.config.width ||
				projectile.y < 0 ||
				projectile.y > this.game.config.height
			) {
				projectile.destroy();
				console.log("Projectile destroyed");
			}
		});

		// Makes it so that the player is behind the curved corners
		// at the bottom of the screen and in front at the top
		if (this.player.y > this.game.config.height / 2) {
			this.outerbackground.setDepth(2);
		} else {
			this.outerbackground.setDepth(0);
		}

		// Reference: From my previous week7 assignment (Mattias Slotte)
		// Enemy updates
		this.spawnEnemy(delta);
		this.enemyFollowPlayer();

		if (this.bossCounter >= bossSpawnCounter) {
			this.spawnBoss();
		}

		console.log(this.hallowedCharge(delta));
		if (this.hallowedCharge(delta)) {
			if (this.keys.holyKey.isDown && this.hallowedShotsLeft > 0) {
				this.shootHallowedShot(delta);
			}
		}

		this.hallowedProjectiles.getChildren().forEach((hallowedProjectile) => {
			if (
				hallowedProjectile.x < 0 ||
				hallowedProjectile.x > this.game.config.width ||
				hallowedProjectile.y < 0 ||
				hallowedProjectile.y > this.game.config.height
			) {
				hallowedProjectile.destroy();
				console.log("Hallowed Projectile destroyed");
			}
		});

		if (this.hallowedGrounds.getLength() > 0) {
			// if ((this.player.x > (this.game.config.width / 2 + 227 / 2)) || (this.player.x < (this.game.config.width / 2 - 227 / 2)) || (this.player.y > (this.game.config.height / 2 + 131 / 2)) || (this.player.y < (this.game.config.height / 2 - 131 / 2))) {
			//     this.player.x = this.game.config.width / 2;
			//     this.player.y = this.game.config.height / 2;
			// }
			if (this.darkholes.getLength() > 0) {
				this.darkholes.getChildren().forEach((darkhole) => {
					darkhole.destroy();
					floorFallTimer = 0;
					console.log("Darkhole destroyed");
					console.log("Floor fall timer reset: " + floorFallTimer);
				});
			}
			if (this.hallowedShotsLeft <= 0) {
				this.hallowedGrounds.getChildren().forEach((hallowedGround) => {
					hallowedGround.destroy();
				});
				floorFallTimer = 500;
				console.log("Hallowed ground destroyed");
				console.log("Floor fall timer reset: " + floorFallTimer);

				// Speechbox
				let speechbox = this.physics.add.sprite(
					0 + 35,
					this.game.config.height - 88,
					"speechbox"
				);
				speechbox.setOrigin(0, 0);
				speechbox.setDepth(4);

				// Speech text
				let welcomeText = this.add.text(
					0 + 47,
					this.game.config.height - 76,
					"Time until next floor fall 10s!",
					{
						fontFamily: "Arial",
						fontSize: 12,
						color: "#000000",
					}
				);
				welcomeText.setDepth(5);

				this.time.delayedCall(5000, () => {
					speechbox.destroy();
					welcomeText.destroy();
				});
			}
		}

		this.holyShotsText.setText(
			"Holy Shots (<H>): " + this.hallowedShotsLeft
		);
		this.healthText.setText("Health: " + health);
		this.scoreText.setText("Score: " + this.score);

		floorFallTimer += delta;
		if (floorFallTimer >= timeUntilFloorFall) {
			floorFallTimer = 0;
			this.floorsFall();
		}

		if (health <= 0) {
			this.healthText.setText("Health: " + health);
			this.gameOver();
		}
	}
}
