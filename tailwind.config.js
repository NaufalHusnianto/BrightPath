import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    darkMode: "class",
    plugins: [
        forms,
        nextui({
            themes: {
                light: {
                    colors: {
                        primary: "#FFD34E",
                        secondary: "#EE457E",
                        background: "#F4E8D1",
                    },
                },
                dark: {
                    colors: {
                        primary: "#FFD34E",
                        secondary: "#EE457E",
                        background: "#E1CA9E",
                    },
                },
            },
        }),
    ],
};
