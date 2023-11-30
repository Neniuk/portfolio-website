import React, { Component } from "react";
import "./styles.css";

const TitleDecoration = ({
	decoration,
	decorationAlt,
	decorationWidth,
	decorationHeight,
}) => (
	<img
		className="title-decoration"
		src={decoration}
		alt={decorationAlt}
		style={{ width: decorationWidth, height: decorationHeight }}
	/>
);

class DecoratedTitle extends Component {
	render() {
		const {
			title,
			decoration,
			decorationAlt,
			decorationWidth,
			decorationHeight,
			hasLink,
			link,
		} = this.props;

		return (
			<div className="decorated-title">
				<TitleDecoration
					decoration={decoration}
					decorationAlt={decorationAlt}
					decorationWidth={decorationWidth}
					decorationHeight={decorationHeight}
				/>
				{hasLink ? (
					<a
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						className="decorated-title-link"
					>
						<h3>{title}</h3>
					</a>
				) : (
					<h3>{title}</h3>
				)}
				<TitleDecoration
					decoration={decoration}
					decorationAlt={decorationAlt}
					decorationWidth={decorationWidth}
					decorationHeight={decorationHeight}
				/>
			</div>
		);
	}
}

export default DecoratedTitle;
