import React, { Component } from "react";
import "./styles.css";

type CardProps = {
	headerInclude: boolean;
	bodyContent: React.JSX.Element;
	headerContent?: React.JSX.Element;
	innerCard?: boolean;
	customClass?: string;
};

class Card extends Component<CardProps> {
	render() {
		const {
			headerInclude,
			headerContent,
			bodyContent,
			innerCard,
			customClass,
		} = this.props;

		const primaryColor = getComputedStyle(document.documentElement)
			.getPropertyValue("--primary")
			.trim();

		const secondaryColor = getComputedStyle(document.documentElement)
			.getPropertyValue("--secondary")
			.trim();

		const outerBorderColor = getComputedStyle(document.documentElement)
			.getPropertyValue("--outer-border-color")
			.trim();

		const darkAltColor = getComputedStyle(document.documentElement)
			.getPropertyValue("--dark-alt")
			.trim();

		const classes = `card ${customClass ? customClass : ""}`;

		return (
			<div
				className={classes}
				style={{
					backgroundColor: innerCard ? secondaryColor : primaryColor,
					borderColor: innerCard ? darkAltColor : outerBorderColor,
					minWidth: innerCard ? "95%" : "",
					maxWidth: innerCard ? "95%" : "",
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
