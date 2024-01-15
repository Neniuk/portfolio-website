import React, { Component } from "react";

// Assets
// import snowflake32 from "../../assets/snowflake32.png";
import snowflake11 from "../../assets/snowflake11.png";
import snowflake5 from "../../assets/snowflake5.png";
import snowflake3 from "../../assets/snowflake3.png";
import snowflake1 from "../../assets/snowflake1.png";

const snowflakeImages = {
    11: snowflake11,
    5: snowflake5,
    3: snowflake3,
    1: snowflake1,
};

interface SnowflakeOptions {
    snowflakeImages: any;
    width: number;
    height: number;
    minSpeed: number;
    maxSpeed: number;
    random: (min: number, max: number) => number;
}

class Snowflake {
    x: any;
    y: any;
    speed: any;
    image: HTMLImageElement;
    radius: number;
    opacity: any;
    directionX: any;
    directionY: any;
    rotation: any;
    rotationSpeed: any;

    constructor(options: SnowflakeOptions) {
        this.x = options.random(options.width / 4, (3 * options.width) / 4); // Randomize initial x position
        this.y = options.random(-options.height, 0); // Randomize initial y position

        this.speed = options.random(options.minSpeed, options.maxSpeed);
        this.image = new Image();

        // Weighted randomization of snowflake radius
        let radii = [];
        for (let i = 0; i < 12; i++) {
            radii.push(1);
        }
        for (let i = 0; i < 6; i++) {
            radii.push(3);
        }
        for (let i = 0; i < 3; i++) {
            radii.push(5);
        }
        radii.push(11);

        this.radius = radii[Math.floor(options.random(0, radii.length))];
        this.image.src = options.snowflakeImages[this.radius];

        this.opacity = options.random(0.3, 1);

        this.directionX = options.random(-1, 1);
        this.directionY = options.random(1, 3);

        this.rotation = options.random(0, 2 * Math.PI); // Randomize initial rotation
        this.rotationSpeed = options.random(-0.01, 0.01); // Randomize rotation speed
    }
}

class Snowfall {
    canvas: any;
    ctx: any;
    width: any;
    height: any;
    maxSpeed: any;
    minSpeed: any;
    amount: any;
    maxRadius: any;
    minRadius: any;
    background: any;
    snowflakeImages: any;
    snowflakes: any[];

    constructor(options: {
        canvas: any;
        width: any;
        height: any;
        maxSpeed: any;
        minSpeed: any;
        amount: any;
        background: any;
        snowflakeImages: any;
        maxRadius?: any;
        minRadius?: any;
    }) {
        this.canvas = options.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.width = options.width;
        this.height = options.height;
        this.maxSpeed = options.maxSpeed;
        this.minSpeed = options.minSpeed;
        this.amount = options.amount;
        this.maxRadius = options.maxRadius;
        this.minRadius = options.minRadius;
        this.background = options.background;
        // this.snowFlakeImage = options.snowFlakeImage;
        this.snowflakeImages = options.snowflakeImages;
        this.snowflakes = [];

        this.canvas.style.background = this.background;
        let devicePixelRatio = window.devicePixelRatio || 1;
        this.canvas.width = this.width * devicePixelRatio;
        this.canvas.height = this.height * devicePixelRatio;
        this.ctx.scale(devicePixelRatio, devicePixelRatio);

        this.createSnowflakes();
        this.animateSnowflakes();

        window.addEventListener("resize", () => {
            let devicePixelRatio = window.devicePixelRatio || 1;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width * devicePixelRatio;
            this.canvas.height = this.height * devicePixelRatio;
            this.ctx.scale(devicePixelRatio, devicePixelRatio);

            // Update the x position of each snowflake
            for (let i = 0; i < this.snowflakes.length; i++) {
                let flake = this.snowflakes[i];
                flake.x = this.random(this.width / 4, (3 * this.width) / 4);
            }
        });
    }

    random = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
    };

    createSnowflakes = () => {
        for (let i = 0; i < this.amount; i++) {
            this.snowflakes.push(new Snowflake(this));
        }
    };

    drawSnowflakes = () => {
        for (let i = 0; i < this.snowflakes.length; i++) {
            let flake = this.snowflakes[i];

            // Adjust the global alpha
            this.ctx.globalAlpha =
                flake.opacity *
                (1 -
                    Math.max(
                        0,
                        (flake.y - flake.radius) / (this.height - flake.radius)
                    ));

            // Save the canvas context
            this.ctx.save();

            // Translate the canvas context origin to the center of the snowflake
            this.ctx.translate(flake.x, flake.y);

            // Rotate the canvas context
            this.ctx.rotate(flake.rotation);

            this.ctx.drawImage(
                flake.image,
                -flake.radius,
                -flake.radius,
                flake.radius * 2,
                flake.radius * 2
            );

            // Restore the canvas context
            this.ctx.restore();

            // Update the rotation
            flake.rotation += flake.rotationSpeed;

            // Reset the global alpha
            this.ctx.globalAlpha = 1;

            flake.x += flake.directionX * flake.speed;
            flake.y += flake.directionY * flake.speed;

            if (flake.y > this.height) {
                flake.y = -5;
                flake.x = this.random(0, this.width);
            }
        }
    };

    setGradient = () => {
        // Define gradient parameters
        const gradientStartX = this.width / 2;
        const gradientStartY = -100;
        const gradientStartRadius = 50;
        const gradientEndX = this.width / 2;
        const gradientEndY = -100;
        const gradientEndRadius = 1000;

        // Create radial gradient
        let gradient = this.ctx.createRadialGradient(
            gradientStartX,
            gradientStartY,
            gradientStartRadius,
            gradientEndX,
            gradientEndY,
            gradientEndRadius
        );

        gradient.addColorStop(0, "rgba(255, 255, 255, 0.05)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.025)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        // Apply gradient
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
    };

    animateSnowflakes = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.setGradient();

        this.drawSnowflakes();
        requestAnimationFrame(this.animateSnowflakes);
    };
}

class MySnow extends Component {
    componentDidMount() {
        new Snowfall({
            canvas: document.getElementById("snowCanvas"),
            width: window.innerWidth,
            height: window.innerHeight,
            maxSpeed: 0.5,
            minSpeed: 0.1,
            amount: 200,
            background: "linear-gradient(to bottom, #000000 0%, #000000 100%)",
            snowflakeImages: snowflakeImages,
        });
    }
    render() {
        return (
            <canvas
                id="snowCanvas"
                className="z-bottom absolute h-full w-full"
            ></canvas>
        );
    }
}

export default React.memo(MySnow);
