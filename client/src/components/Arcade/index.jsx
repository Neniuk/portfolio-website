import React, { Component } from "react";
import "./styles.css";
import controllerImage from "../../assets/controller.png";

class MyArcade extends Component {
	// Handle arcade logo click
	handleArcadeLogoClick = () => {
		// Check if an element with the id "arcade-canvas" already exists
		if (document.getElementById("arcade-canvas")) {
			console.log("Arcade already open");
			return;
		}

		// Create new canvas element and grey out the background
		const arcadeCanvas = document.createElement("canvas");
		arcadeCanvas.id = "arcade-canvas";

		console.log("Aracde opened");

		arcadeCanvas.width = window.innerWidth / 2;
		arcadeCanvas.height = window.innerHeight / 2;

		arcadeCanvas.style.position = "absolute";

		// Position in the center of the page
		arcadeCanvas.style.top = "50%";
		arcadeCanvas.style.left = "50%";
		arcadeCanvas.style.transform = "translate(-50%, -50%)";

		arcadeCanvas.style.zIndex = "100";

		// White canvas
		const arcadeCtx = arcadeCanvas.getContext("2d");
		arcadeCtx.fillStyle = "#fff";
		arcadeCtx.fillRect(0, 0, arcadeCanvas.width, arcadeCanvas.height);

		document.body.appendChild(arcadeCanvas);
	};

	// Add event listener to arcade logo
	componentDidMount() {
		const arcadeLogo = document.querySelector(".arcade");
		arcadeLogo.addEventListener("click", this.handleArcadeLogoClick);
	}

	render() {
		return (
			<div className="card">
				<div className="arcade">
					<div className="arcade-logo-container">
						<img
							src={controllerImage}
							alt="Game controller"
							className="arcade-logo"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default React.memo(MyArcade);
