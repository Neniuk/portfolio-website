/** @type {import('stylelint').Config} */
export default {
    rules: {
        "at-rule-no-unknown": [
            true,
            {
                ignoreAtRules: [
                    "tailwind",
                    "apply",
                    "variants",
                    "responsive",
                    "screen",
                ],
            },
        ],
        "custom-property-empty-line-before": null,
    },
};
