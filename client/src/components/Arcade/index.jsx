import React, { Component } from "react";
import "./styles.css";
import controllerImage from "../../assets/controller.png";
import JetpackZombiesGame from "./Games/JetpackZombies";

class MyArcade extends Component {
	state = {
		gameActive: false,
	};

	// Handle arcade logo click
	handleArcadeLogoClick = () => {
		this.setState({ gameActive: true });
	};

	// Add event listener to arcade logo & unmount event listener
	componentDidMount() {
		const arcadeLogo = document.querySelector(".arcade-logo");
		arcadeLogo.addEventListener("click", this.handleArcadeLogoClick);
	}

	componentWillUnmount() {
		const arcadeLogo = document.querySelector(".arcade-logo");
		arcadeLogo.removeEventListener("click", this.handleArcadeLogoClick);
	}

	render() {
		const { gameActive } = this.state;

		return (
			<div className="card">
				<div className="arcade">
					<div className="arcade-logo-container">
						<img
							src={controllerImage}
							alt="Game controller"
							className="arcade-logo"
							onClick={this.handleArcadeLogoClick}
						/>
					</div>
				</div>
				{gameActive && <JetpackZombiesGame />}
			</div>
		);
	}
}

export default React.memo(MyArcade);
