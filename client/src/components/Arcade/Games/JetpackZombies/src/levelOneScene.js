import Phaser from "phaser";

const playerSpeed = 100;
const projectileSpeed = 200;
const projectileCooldown = 1500;
const defaultFrozen = true;
const defaultFrozenShot = 0;

const assetPath = "/gameAssets/JetpackZombies/";

export default class LevelOneScene extends Phaser.Scene {
    constructor() {
        super("LevelOneScene");

        this.frozen = defaultFrozen;
    }

    init(data) {
        if (data.frozen !== undefined) this.frozen = data.frozen;

        if (data.score !== undefined) {
            this.score = data.score;
        } else {
            this.score = 0;
        }

        this.name = data.name;

        if (this.name === undefined) {
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
            "Press <SPACE> to shoot! But wait until I've initiated the \nforce field around the tutorial range...",
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

        // Player
        this.player = this.physics.add.sprite(
            this.game.config.width / 2,
            this.game.config.height / 2,
            "player"
        );

        if (this.frozen) {
            this.player.setTexture("playerRight");
        }

        //this.frozen = defaultFrozen;
        this.frozenShot = defaultFrozenShot;

        // Reference: https://stackoverflow.com/questions/38521869/phaser-js-colliding-with-world-bounds
        // this.player.body.setCollideWorldBounds(true);
        this.player.depth = 1;

        // Enemies
        this.enemies = this.physics.add.group();

        // Projectiles
        this.projectiles = this.physics.add.group();
        this.frozenProjectile = this.physics.add.group();

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
            this.projectileChargeText.setText(
                "Laser Charge (<SPACE>): " + chargeText
            );

            if (this.projectileTimer >= projectileCooldown) {
                return true;
            }
            this.projectileTimer += delta;
            return false;
        };

        this.shootProjectile = function (delta) {
            if (this.frozen) {
                if (this.frozenShot !== 0) {
                    return;
                }
                let projectile = this.physics.add.sprite(
                    this.player.x,
                    this.player.y,
                    "projectile"
                );
                this.frozenProjectile.add(projectile);
                projectile.setOrigin(0.5, 0.5);
                projectile.body.setVelocityX(projectileSpeed);

                this.projectileTimer = 0;
                this.frozenShot = 1;

                this.laserSound.play();
                return;
            }

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

        // Overlaps and Colliders
        this.physics.add.overlap(
            this.projectiles,
            this.enemies,
            function (projectile, enemy) {
                projectile.destroy();
                enemy.destroy();
            }
        );

        this.physics.add.collider(this.player, this.outerwalls);

        // Animations
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

        this.time.delayedCall(15000, () => {
            this.shootProjectile(delta);
        });

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

        this.frozenProjectile.getChildren().forEach((projectile) => {
            if (
                projectile.x < 0 ||
                projectile.x > this.game.config.width ||
                projectile.y < 0 ||
                projectile.y > this.game.config.height
            ) {
                projectile.destroy();
                console.log("Projectile destroyed");
                this.scene.start("ShootingCutScene", {
                    score: this.score,
                    name: this.name,
                });
            }
        });

        // Makes it so that the player is behind the curved corners
        // at the bottom of the screen and in front at the top
        if (this.player.y > this.game.config.height / 2) {
            this.outerbackground.setDepth(2);
        } else {
            this.outerbackground.setDepth(0);
        }
    }
}
