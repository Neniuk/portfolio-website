import { Component } from "react";
import "./styles.css";

const TitleDecoration = ({
	decoration,
	decorationAlt,
	decorationWidth,
	decorationHeight,
	decorationBrightness,
	right,
}: {
	decoration: string;
	decorationAlt: string;
	decorationWidth: string;
	decorationHeight: string;
	decorationBrightness: string;
	right: boolean;
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

type DecoratedTitleProps = {
	title: string;
	decoration: string;
	decorationAlt: string;
	decorationWidth: string;
	decorationHeight: string;
	hasLink?: boolean;
	link?: string;
	titleSize?: string;
	titleColor?: string;
	marginTop?: string;
	marginBottom?: string;
	decorationBrightness?: string;
};

class DecoratedTitle extends Component<DecoratedTitleProps> {
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
					decorationBrightness={
						decorationBrightness ? decorationBrightness : ""
					}
					right={false}
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
					decorationBrightness={
						decorationBrightness ? decorationBrightness : ""
					}
					right={true}
				/>
			</div>
		);
	}
}

export default DecoratedTitle;
