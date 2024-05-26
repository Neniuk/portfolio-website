import React from "react";
import "./styles.css";

import validator from "validator";

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

const DecoratedTitle: React.FC<DecoratedTitleProps> = ({
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
}) => {
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
            {hasLink && link && validator.isURL(link) ? (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="decorated-title-link"
                >
                    <h3
                        style={titleStyle}
                        className="color-titleColorSecondary decoration-titleColorSecondary underline"
                    >
                        {title}
                    </h3>
                </a>
            ) : (
                <h3 style={titleStyle} className="color-titleColorSecondary">
                    {title}
                </h3>
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
};

export default DecoratedTitle;
