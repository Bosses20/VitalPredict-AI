import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                md: "1.5rem",
                lg: "2rem",
            },
        },
        fontFamily: {
            sans: ["var(--font-inter)", "sans-serif"],
        },
        screens: {
            sm: "375px",
            md: "768px",
            lg: "1200px",
        },
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        color: '#fff',
                        a: {
                            color: '#84cc16',
                            '&:hover': {
                                color: '#a3e635',
                            },
                        },
                        h1: {
                            color: '#fff',
                        },
                        h2: {
                            color: '#fff',
                        },
                        h3: {
                            color: '#fff',
                        },
                        h4: {
                            color: '#fff',
                        },
                        strong: {
                            color: '#fff',
                        },
                        code: {
                            color: '#fff',
                        },
                        figcaption: {
                            color: 'rgba(255, 255, 255, 0.7)',
                        },
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
export default config;
