/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            maxWidth: {
                "95%": "95%",
            },
            minWidth: {
                "95%": "95%",
            },
            width: {
                "200px": "200px",
                "32px": "32px",
            },
            height: {
                "200px": "200px",
                "32px": "32px",
            },
            fontFamily: {
                titleFont: "var(--title-font)",
            },
            colors: {
                primaryColor: "var(--color-primary)",
                secondaryColor: "var(--color-secondary)",
                accentColor: "var(--color-accent)",
                accentSecondaryColor: "var(--color-accent-secondary)",
                accentTertiaryColor: "var(--color-accent-tertiary)",
                outerBorderColor: "var(--color-outer-border)",
                innerBorderColor: "var(--color-inner-border)",
                connectedColor: "var(--color-connected)",
                disconnectedColor: "var(--color-disconnected)",
                titleColorPrimary: "var(--color-title-primary)",
                titleColorSecondary: "var(--color-title-secondary)",
                textBoldColor: "var(--color-text-bold)",
                textLightColor: "var(--color-text-light)",
                borderColorPrimary: "var(--color-border-primary)",
                borderColorSecondary: "var(--color-border-secondary)",
            },
            zIndex: {
                bottom: "-1000",
            },
            translate: {
                mirrorX: "var(--translate-mirror-x)",
                mirrorY: "var(--translate-mirror-y)",
            },
            animation: {
                "spin-slow": "spin 2s linear infinite",
            },
        },
    },
    variants: {
        extend: {
            animation: ["hover"],
        },
    },
    plugins: [],
};
