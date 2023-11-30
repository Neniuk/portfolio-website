import React, { Component } from "react";
import "./styles.css";

const TitleDecoration = ({
	decoration,
	decorationAlt,
	decorationWidth,
	decorationHeight,
	decorationBrightness,
	right,
}) => (
	<img
		className={`title-decoration ${right ? "right" : ""}`}
		src={decoration}
		alt={decorationAlt}
		style={{
			width: decorationWidth,
			height: decorationHeight,
			filter: decorationBrightness
				? `brightness(${decorationBrightness})`
				: "",
		}}
	/>
);

class DecoratedTitle extends Component {
	render() {
		const {
			title,
			titleSize,
			titleColor,
			marginTop,
			marginBottom,
			decoration,
			decorationAlt,
			decorationWidth,
			decorationHeight,
			decorationBrightness,
			hasLink,
			link,
		} = this.props;

		const titleStyle = {
			fontSize: titleSize,
			color: titleColor,
		};

		return (
			<div
				className="decorated-title"
				style={{
					marginTop: marginTop ? marginTop : "0",
					marginBottom: marginBottom ? marginBottom : "0.5rem",
				}}
			>
				<TitleDecoration
					decoration={decoration}
					decorationAlt={decorationAlt}
					decorationWidth={decorationWidth}
					decorationHeight={decorationHeight}
					decorationBrightness={decorationBrightness}
				/>
				{hasLink ? (
					<a
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						className="decorated-title-link"
					>
						<h3 style={titleStyle}>{title}</h3>
					</a>
				) : (
					<h3 style={titleStyle}>{title}</h3>
				)}
				<TitleDecoration
					decoration={decoration}
					decorationAlt={decorationAlt}
					decorationWidth={decorationWidth}
					decorationHeight={decorationHeight}
					decorationBrightness={decorationBrightness}
					right={true}
				/>
			</div>
		);
	}
}

export default DecoratedTitle;
