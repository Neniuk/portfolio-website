import React, { Component } from "react";
import "./styles.css";

class Card extends Component {
	render() {
		const { headerInclude, headerContent, bodyContent, innerCard } =
			this.props;

		// Get the value of the --secondary CSS variable
		const secondaryColor = getComputedStyle(document.documentElement)
			.getPropertyValue("--secondary")
			.trim();

		return (
			<div
				className="card"
				style={{
					backgroundColor: innerCard ? secondaryColor : "initial",
				}}
			>
				{headerInclude && (
					<div className="card-header">{headerContent}</div>
				)}
				<div className="card-body">{bodyContent}</div>
			</div>
		);
	}
}

export default Card;
