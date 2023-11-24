import React, { Component } from "react";
import "./styles.css";

class Snowflake {
	constructor(options) {
		this.x = options.random(0, options.width);
		this.y = options.height; // Start from the bottom
		this.speed = options.random(options.minSpeed, options.maxSpeed);
		this.radius = options.random(options.minRadius, options.maxRadius);
		this.opacity = options.random(0.5, 1);
		this.directionX = options.random(-1, 1);
		this.directionY = options.random(1, 3);
		this.image = options.snowFlakeImage;
	}
}

class Snowfall {
	constructor(options) {
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
		this.snowFlakeImage = options.snowFlakeImage;
		this.snowflakes = [];

		const random = (min, max) => {
			return Math.random() * (max - min) + min;
		};

		const createSnowflakes = () => {
			for (let i = 0; i < this.amount; i++) {
				this.snowflakes.push(new Snowflake(this));
			}
		};

		createSnowflakes();

		const drawSnowflakes = () => {
			for (let i = 0; i < this.snowflakes.length; i++) {
				let flake = this.snowflakes[i];

				this.ctx.beginPath();
				this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
				this.ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
				this.ctx.fill();

				flake.x += flake.directionX * flake.speed;
				flake.y += flake.directionY * flake.speed;

				if (flake.y > this.height) {
					flake.y = -5;
					flake.x = random(0, this.width);
				}
			}
		};

		const animateSnowflakes = () => {
			this.ctx.clearRect(0, 0, this.width, this.height);
			drawSnowflakes();
			requestAnimationFrame(animateSnowflakes);
		};

		animateSnowflakes();

		this.canvas.style.background = this.background;
	}
}

class MySnow extends Component {
	componentDidMount() {
		const snowfall = new Snowfall({
			canvas: document.querySelector(".snow"),
			width: window.innerWidth,
			height: window.innerHeight,
			maxSpeed: 2,
			minSpeed: 0.5,
			amount: 100,
			maxRadius: 4,
			minRadius: 1,
			background: "linear-gradient(to bottom, #000000 0%, #000000 100%)",
			snowFlakeImage: "https://i.imgur.com/55g9h9u.png",
		});
	}
	render() {
		return <div className="snow"></div>;
	}
}

export default React.memo(MySnow);
