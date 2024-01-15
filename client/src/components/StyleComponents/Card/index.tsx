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

        const innerCardClasses: string = "inner-card mb-4";
        const outerCardClasses: string = "card mb-4";

        return (
            <div
                className={classes + "p-6"}
                // Different classes depending on if it is innerCard
                // className={innerCard ? "inner-card" : "card"}
                style={{
                    backgroundColor: innerCard ? secondaryColor : primaryColor,
                    borderColor: innerCard ? darkAltColor : outerBorderColor,
                }}
            >
                {headerInclude && (
                    <div className="flex w-full flex-row items-start justify-between">
                        {headerContent}
                    </div>
                )}
                <div className="flex w-full flex-col items-center justify-center">
                    {bodyContent}
                </div>
            </div>
        );
    }
}

export default Card;
