/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,jsx,ts,tsx}",
        "./pages/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("@carrot-kpi/ui/tailwind-preset")],
    theme: {
        extend: {
            backgroundImage: {
                "black-squares":
                    "linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), " +
                    "linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
                "white-squares":
                    "linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), " +
                    "linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            },
        },
    },
};
