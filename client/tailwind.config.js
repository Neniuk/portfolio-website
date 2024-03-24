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
                titleColorPrimary: "var(--title-color-primary)",
                titleColorSecondary: "var(--title-color-secondary)",
                textBoldColor: "var(--text-bold-color)",
                borderColorPrimary: "var(--border-color-primary)",
                borderColorSecondary: "var(--border-color-secondary)",
            },
            zIndex: {
                bottom: "-1000",
            },
            translate: {
                mirrorX: "var(--translate-mirror-x)",
                mirrorY: "var(--translate-mirror-y)",
            },
        },
    },
    plugins: [],
};
