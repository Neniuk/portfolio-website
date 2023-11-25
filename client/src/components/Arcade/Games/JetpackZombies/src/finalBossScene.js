import Phaser from "phaser";

// const playerSpeed = 100;
// const projectileSpeed = 200;
// const projectileCooldown = 1500;
// const enemySpawnTime = 1000;
// const enemySpeed = playerSpeed / 4;
// const itemSpawnChance = 25;
// const bossSpawnCounter = 20;

// export default class LevelTwoScene extends Phaser.Scene {
//     constructor() {
//         super("LevelTwoScene");
//     }

//     // init(data) {

//     // }

//     preload() {
//         // Sprite Sheets
//         this.load.spritesheet("explosion", "assets/ExplosionBig2.png", {
//             frameWidth: 64,
//             frameHeight: 64
//         });
//         this.load.spritesheet("player", "assets/PlayerSheet2.png", {
//             frameWidth: 22,
//             frameHeight: 28
//         });

//         // Images
//         this.load.image("playerRight", "assets/PlayerRight.png");
//         this.load.image("projectile", "assets/GreenProjectileSmall.png");
//         this.load.image("innerbackground", "assets/InnerBackground.png");
//         this.load.image("outerbackground", "assets/OuterBackground.png");
//         this.load.image("topouter", "assets/TopOuter.png");
//         this.load.image("bottomouter", "assets/BottomOuter.png");
//         this.load.image("leftouter", "assets/LeftOuter.png");
//         this.load.image("rightouter", "assets/RightOuter.png");
//         this.load.image("amazingtron", "assets/amazingtron9001.png");
//         this.load.image("speechbox", "assets/speechbox.png");
//         this.load.image("item", "assets/coinItem.png");

//         // Audio
//         this.load.audio("laserSound", ["assets/laser.mp3", "assets/laser.ogg"]);
//     }

//     create() {
//         // Sound
//         // Reference: https://stackoverflow.com/questions/51601926/how-to-set-volume-in-phaser-3
//         this.laserSound = this.sound.add("laserSound", {volume: 0.5});

//         // Backgrounds
//         this.innerbackground = this.add.image(0, 0, "innerbackground");
//         this.innerbackground.setScale(2);
//         this.innerbackground.setOrigin(0, 0);

//         // Amazingtron-9000
//         this.amazingtron = this.physics.add.sprite(this.game.config.width - 42, this.game.config.height - 63, "amazingtron");
//         this.amazingtron.setScale(2);
//         this.amazingtron.setDepth(5);

//         // Speechbox
//         this.speechbox = this.physics.add.sprite(0 + 35, this.game.config.height - 88, "speechbox");
//         this.speechbox.setOrigin(0, 0);
//         this.speechbox.setDepth(4);

//         // Speech text
//         this.welcomeText = this.add.text(0 + 47, this.game.config.height - 76, "Press <SPACE> to shoot! But wait until I've initiated the \nforce field around the tutorial range...", {
//             fontFamily: "Arial",
//             fontSize: 12,
//             color: "#000000"
//         });
//         this.welcomeText.setDepth(5);

//         // For the corners
//         this.outerbackground = this.physics.add.image(0, 0, "outerbackground");
//         this.outerbackground.setScale(2);
//         this.outerbackground.setOrigin(0, 0);

//         // Outer walls
//         this.outerwalls = this.physics.add.group({
//             immovable: true,
//             allowGravity: false
//         });

//         this.topouter = this.physics.add.image(0, 0, "topouter");
//         this.topouter.setScale(2);
//         this.topouter.setOrigin(0, 0);
//         //this.topouter.setImmovable(true);
//         this.outerwalls.add(this.topouter);

//         this.bottomouter = this.physics.add.image(0, 0, "bottomouter");
//         this.bottomouter.setScale(2);
//         this.bottomouter.setOrigin(0, 0);
//         this.bottomouter.setPosition(0, this.game.config.height - this.bottomouter.height * 2);
//         //this.bottomouter.setImmovable(true);
//         this.outerwalls.add(this.bottomouter);

//         this.leftouter = this.physics.add.image(1, 0, "leftouter");
//         this.leftouter.setScale(2);
//         this.leftouter.setOrigin(0, 0);
//         //this.leftouter.setImmovable(true);
//         this.outerwalls.add(this.leftouter);

//         this.rightouter = this.physics.add.image(0, 0, "rightouter");
//         this.rightouter.setScale(2);
//         this.rightouter.setOrigin(0, 0);
//         this.rightouter.setPosition(this.game.config.width - this.rightouter.width * 2, 0);
//         //this.rightouter.setImmovable(true);
//         this.outerwalls.add(this.rightouter);

//         // Player
//         this.player = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "player");

//         // Reference: https://stackoverflow.com/questions/38521869/phaser-js-colliding-with-world-bounds
//         // this.player.body.setCollideWorldBounds(true);
//         this.player.depth = 1;
//         this.health = 3;
//         this.score = 0;
//         this.bossCounter = 0;

//         // Reference: From my assignment from week7 (Mattias Slotte)
//         // Enemies
//         this.enemyTimer = enemySpawnTime;
//         this.enemies = this.physics.add.group();
//         this.bosses = this.physics.add.group();

//         // Reference: https://phaser.discourse.group/t/how-to-deal-with-framerate-drop/8085
//         this.spawnEnemy = function(delta) {
//             if (this.enemyTimer <= 0) {
//                 this.enemyTimer = enemySpawnTime;

//                 const spawnArea = {
//                     top: -32,
//                     bottom: 320 + 32,
//                     left: -32,
//                     right: 480 + 32,
//                   };

//                   // Choose a random side from which the enemy should enter the screen.
//                   const side = Phaser.Math.Between(0, 3); // 0: top, 1: bottom, 2: left, 3: right

//                   let randomX, randomY;

//                   switch (side) {
//                     case 0: // Top
//                       randomX = Phaser.Math.Between(0, 320);
//                       randomY = spawnArea.top;
//                       break;
//                     case 1: // Bottom
//                       randomX = Phaser.Math.Between(0, 320);
//                       randomY = spawnArea.bottom;
//                       break;
//                     case 2: // Left
//                       randomX = spawnArea.left;
//                       randomY = Phaser.Math.Between(0, 480);
//                       break;
//                     case 3: // Right
//                       randomX = spawnArea.right;
//                       randomY = Phaser.Math.Between(0, 480);
//                       break;
//                   }

//                 // let enemySpawnX = Phaser.Math.Between(spawnArea.x, spawnArea.width);
//                 // let enemySpawnY = Phaser.Math.Between(spawnArea.y, spawnArea.height);

//                 let enemy = this.physics.add.sprite(randomX, randomY, "enemy1");
//                 //enemy.setOrigin(0, 0);
//                 enemy.setDepth(3);
//                 this.enemies.add(enemy);

//                 let targetAngle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y)
//                 console.log(targetAngle);

//                 enemy.setRotation(targetAngle);
//                 this.physics.moveTo(enemy, this.player.x, this.player.y, enemySpeed);
//             }
//             this.enemyTimer -= delta;
//         };

//         this.spawnBoss = () => {
//             this.bossCounter = 0;
//             const spawnArea = {
//                 top: -32,
//                 bottom: 320 + 32,
//                 left: -32,
//                 right: 480 + 32,
//               };

//               // Choose a random side from which the enemy should enter the screen.
//               const side = Phaser.Math.Between(0, 3); // 0: top, 1: bottom, 2: left, 3: right

//               let randomX, randomY;

//               switch (side) {
//                 case 0: // Top
//                   randomX = Phaser.Math.Between(0, 320);
//                   randomY = spawnArea.top;
//                   break;
//                 case 1: // Bottom
//                   randomX = Phaser.Math.Between(0, 320);
//                   randomY = spawnArea.bottom;
//                   break;
//                 case 2: // Left
//                   randomX = spawnArea.left;
//                   randomY = Phaser.Math.Between(0, 480);
//                   break;
//                 case 3: // Right
//                   randomX = spawnArea.right;
//                   randomY = Phaser.Math.Between(0, 480);
//                   break;
//               }

//             // let enemySpawnX = Phaser.Math.Between(spawnArea.x, spawnArea.width);
//             // let enemySpawnY = Phaser.Math.Between(spawnArea.y, spawnArea.height);

//             let enemy = this.physics.add.sprite(randomX, randomY, "enemy1");
//             //enemy.setOrigin(0, 0);
//             enemy.setDepth(3);
//             enemy.setScale(2);
//             enemy.enemyClass = "boss";

//             this.enemies.add(enemy);
//             this.bosses.add(enemy);

//             let targetAngle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y)
//             console.log(targetAngle);

//             enemy.setRotation(targetAngle);
//             this.physics.moveTo(enemy, this.player.x, this.player.y, enemySpeed);
//         };

//         // Reference: https://stackoverflow.com/questions/67708864/how-do-i-make-it-so-an-enemy-sprite-follows-the-player-sprite-in-phaser-3
//         this.enemyFollowPlayer = function() {
//             this.enemies.getChildren().forEach(enemy => {
//                 let targetAngle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y);
//                 enemy.setRotation(targetAngle);
//                 this.physics.moveTo(enemy, this.player.x, this.player.y, enemySpeed);
//             });
//         }

//         // Projectiles
//         this.projectiles = this.physics.add.group();

//         this.projectileTimer = projectileCooldown;
//         this.projectileChargeText = this.add.text(10, 30, "Laser Charge (<SPACE>): 0%", {
//             fontFamily: "Arial",
//             fontSize: 14,
//             color: "#ffffff"
//         });

//         this.projectileChargeText.setDepth(3);

//         this.projectileCharge = function(delta) {
//             let charge = Math.floor(this.projectileTimer);
//             if (charge < 0) {
//                 charge = 0;
//             }
//             let chargeText = Math.floor((charge / projectileCooldown) * 100) + "%";
//             this.projectileChargeText.setText("Laser Charge (<SPACE>): " + chargeText);

//             if (this.projectileTimer >= projectileCooldown) {
//                 return true;
//             }
//             this.projectileTimer += delta;
//             return false;
//         };

//         this.shootProjectile = function(delta) {
//             let projectile = this.physics.add.sprite(this.player.x, this.player.y, "projectile");
//             this.projectiles.add(projectile);
//             projectile.setOrigin(0.5, 0.5);
//             projectile.setDepth(2);

//             // Reference: https://www.html5gamedevs.com/topic/38533-angle-to-mouse-pointer-on-phaser-3/
//             let targetAngle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.game.input.mousePointer.x + this.cameras.main.scrollX, this.game.input.mousePointer.y + this.cameras.main.scrollY)
//             console.log(targetAngle);

//             projectile.setRotation(targetAngle);
//             this.physics.moveTo(projectile, this.game.input.mousePointer.x, this.game.input.mousePointer.y, projectileSpeed);

//             this.projectileTimer = 0;

//             this.laserSound.play();
//         };

//         // Items
//         this.items = this.physics.add.group();

//         // Overlaps and Colliders
//         this.spawnItem = (enemyX, enemyY) => {
//             let item = this.physics.add.sprite(enemyX, enemyY, "item");
//             this.items.add(item);
//             console.log("Item spawned");

//             // Reference: https://stackoverflow.com/questions/54630495/phaser-how-to-use-a-simple-timer-from-0-to-3
//             this.time.delayedCall(5000, () => { item.destroy(); }, null, this);
//         }

//         this.bossChargeText = this.add.text(10, 50, "Boss spawn (DESTROY ENEMIES): 0%", {
//             fontFamily: "Arial",
//             fontSize: 14,
//             color: "#ffffff"
//         });

//         this.bossChargeText.setDepth(3);

//         this.destroyEnemy = (enemy) => {
//             let charge = this.bossCounter;
//             if (charge < 0) {
//                 charge = 0;
//             }
//             let chargeText = Math.floor((charge / bossSpawnCounter) * 100) + "%";
//             this.bossChargeText.setText("Boss spawn (DESTROY ENEMIES): " + chargeText);

//             let enemyX = enemy.x;
//             let enemyY = enemy.y;

//             let explosion = this.add.sprite(enemyX, enemyY);
//             explosion.setDepth(3);
//             let itemRoll = Phaser.Math.Between(0, 100);

//             enemy.destroy();

//             this.bossCounter += 1;

//             if (itemRoll <= itemSpawnChance) {
//                 this.spawnItem(enemyX, enemyY);
//             }

//             explosion.anims.play("explosionAnimation");

//             explosion.on("animationcomplete", () => {
//                 explosion.destroy();
//             });
//         }

//         this.physics.add.overlap(this.projectiles, this.enemies, (projectile, enemy) => {
//             projectile.destroy();
//             this.destroyEnemy(enemy);

//             this.score += 1;
//             console.log(this.score);
//         });

//         this.physics.add.collider(this.player, this.outerwalls);

//         this.physics.add.overlap(this.player, this.items, (player, item) => {
//             item.destroy();
//             this.health += 1;
//             console.log("Item collected");
//             console.log(this.health);
//         });

//         this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
//             let enemyClass = enemy.enemyClass;
//             this.destroyEnemy(enemy);

//             if (enemyClass === "boss") {
//                 this.health -= 3;
//                 console.log("Killed by boss");
//             } else {
//                 this.health -= 1;
//                 this.score += 1;
//             }
//             console.log(this.health);
//             console.log(this.score);
//         });

//         // Animations
//         this.explosion = this.add.sprite(240, 160);
//         this.anims.create({
//             key: "explosionAnimation",
//             frames: this.anims.generateFrameNumbers("explosion"),
//             frameRate: 10
//             //repeat: -1
//         });

//         this.anims.create({
//             key: "right",
//             frames: this.anims.generateFrameNumbers("player", {
//                 start: 2,
//                 end: 2
//             }),
//             frameRate: 10,
//             repeat: -1
//         });

//         this.anims.create({
//             key: "left",
//             frames: this.anims.generateFrameNumbers("player", {
//                 start: 3,
//                 end: 3
//             }),
//             frameRate: 10,
//             repeat: -1
//         });

//         this.anims.create({
//             key: "up",
//             frames: this.anims.generateFrameNumbers("player", {
//                 start: 1,
//                 end: 1
//             }),
//             frameRate: 10,
//             repeat: -1
//         });

//         this.anims.create({
//             key: "down",
//             frames: this.anims.generateFrameNumbers("player", {
//                 start: 0,
//                 end: 0
//             }),
//             frameRate: 10,
//             repeat: -1
//         });

//         // Game Over

//         // Input Keys
//         // Reference: https://newdocs.phaser.io/docs/3.54.0/focus/Phaser.Input.Keyboard.KeyboardPlugin-addKeys
//         this.keys = this.input.keyboard.addKeys({
//             'space': Phaser.Input.Keyboard.KeyCodes.SPACE,
//             'upArrow': Phaser.Input.Keyboard.KeyCodes.UP,
//             'downArrow': Phaser.Input.Keyboard.KeyCodes.DOWN,
//             'leftArrow': Phaser.Input.Keyboard.KeyCodes.LEFT,
//             'rightArrow': Phaser.Input.Keyboard.KeyCodes.RIGHT,
//             'up': Phaser.Input.Keyboard.KeyCodes.W,
//             'down': Phaser.Input.Keyboard.KeyCodes.S,
//             'left': Phaser.Input.Keyboard.KeyCodes.A,
//             'right': Phaser.Input.Keyboard.KeyCodes.D
//         });
//     }

//     update(time, delta) {
//         // Player Movement
//         if ((this.keys.left.isDown || this.keys.leftArrow.isDown) && !this.frozen) {
//             this.player.body.setVelocityX(-playerSpeed);
//             this.player.anims.play("left", true);
//         } else if ((this.keys.right.isDown || this.keys.rightArrow.isDown) && !this.frozen) {
//             this.player.body.setVelocityX(playerSpeed);
//             this.player.anims.play("right", true);
//         } else {
//             this.player.body.setVelocityX(0);
//         }

//         if ((this.keys.up.isDown || this.keys.upArrow.isDown) && !this.frozen) {
//             this.player.body.setVelocityY(-playerSpeed);
//             this.player.anims.play("up", true);
//         } else if ((this.keys.down.isDown || this.keys.downArrow.isDown) && !this.frozen) {
//             this.player.body.setVelocityY(playerSpeed);
//             this.player.anims.play("down", true);
//         } else {
//             this.player.body.setVelocityY(0);
//         }

//         // Player Shooting
//         if (this.projectileCharge(delta) && this.keys.space.isDown) {
//             this.shootProjectile(delta);
//         }

//         // Check if projectiles are within the bounds of the screen
//         this.projectiles.getChildren().forEach((projectile) => {
//             if (projectile.x < 0 || projectile.x > this.game.config.width || projectile.y < 0 || projectile.y > this.game.config.height) {
//                 projectile.destroy();
//                 console.log("Projectile destroyed");
//             }
//         });

//         // Makes it so that the player is behind the curved corners
//         // at the bottom of the screen and in front at the top
//         if (this.player.y > this.game.config.height / 2) {
//             this.outerbackground.setDepth(2);
//         } else {
//             this.outerbackground.setDepth(0);
//         }

//         // Reference: From my previous week7 assignment (Mattias Slotte)
//         // Enemy updates
//         this.spawnEnemy(delta);
//         this.enemyFollowPlayer();

//         if (this.bossCounter >= bossSpawnCounter) {
//             this.spawnBoss();
//         }
//     }
// }
