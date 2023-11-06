/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "black",
                secondary: "#828282",
                "primary-bg": "#f6f6ef",
                "secondary-bg": "#ff6600",
            },
        },
    },
    plugins: [],
};
