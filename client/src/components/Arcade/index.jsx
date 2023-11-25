import React, { Component } from "react";
import Draggable from "react-draggable";
import "./styles.css";
import controllerImage from "../../assets/controller.png";
import JetpackZombiesGame from "./Games/JetpackZombies";
import PongGame from "./Games/Pong";

class MyArcade extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gameActive: false,
		};
		this.nodeRef = React.createRef();
	}

	handleArcadeClick = () => {
		this.setState({ gameActive: true });
	};

	// Add event listener to arcade logo & unmount event listener
	componentDidMount() {
		const arcadeButton = document.querySelector(".arcade");
		arcadeButton.addEventListener("click", this.handleArcadeClick);
	}

	componentWillUnmount() {
		const arcadeButton = document.querySelector(".arcade");
		arcadeButton.removeEventListener("click", this.handleArcadeClick);
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
						/>
					</div>
				</div>
				{gameActive && (
					<Draggable
						handle=".game-navbar"
						nodeRef={this.nodeRef}
						positionOffset={{ x: "-50%", y: "-50%" }}
					>
						<div ref={this.nodeRef} className="game">
							<div className="game-navbar">
								<h1 className="game-navbar-title">Arcade</h1>
								<div
									className="game-navbar-close"
									onClick={() =>
										this.setState({ gameActive: false })
									}
								>
									<h1 className="game-navbar-close-text">
										X
									</h1>
								</div>
							</div>
							<JetpackZombiesGame />
							{/* <PongGame /> */}
						</div>
					</Draggable>
				)}
			</div>
		);
	}
}

export default React.memo(MyArcade);
