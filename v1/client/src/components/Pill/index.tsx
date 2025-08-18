import React, { useEffect, useState } from "react";
import { PillType } from "../../models/PillType";

interface PillProps {
    text: string;
    type: PillType;
}

const Pill: React.FC<PillProps> = ({ text, type }) => {
    const [bgColor, setBgColor] = useState<string>("");
    const [textColor, setTextColor] = useState<string>("");

    useEffect(() => {
        switch (type) {
            case "danger":
                setBgColor("var(--color-pill-danger)");
                setTextColor("var(--color-text-light)");
                break;
            case "warning":
                setBgColor("var(--color-pill-warning)");
                setTextColor("var(--color-text-dark)");
                break;
            case "success":
                setBgColor("var(--color-pill-success)");
                setTextColor("var(--color-text-light)");
                break;
            case "info":
                setBgColor("var(--color-pill-info)");
                setTextColor("var(--color-text-light)");
                break;
            case "blank":
            default:
                setBgColor("transparent");
                setTextColor("var(--color-text-light)");
                break;
        }
    }, [type]);

    return (
        <div
            className="inline-flex max-w-fit items-center justify-center rounded-full px-3 py-1 text-center text-sm text-white"
            style={{
                backgroundColor: bgColor,
                color: textColor,
                border:
                    type === "blank"
                        ? "2px solid var(--color-pill-blank)"
                        : "none",
            }}
        >
            <span className="font-bold leading-snug">{text}</span>
        </div>
    );
};

export default Pill;
