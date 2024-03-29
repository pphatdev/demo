/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/index.html',
        './src/**/*.{html,js}',
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                "ubuntu-condensed": ['"Ubuntu Condensed"', 'sans-serif'],
                "ubuntu-mono": ['"Ubuntu Mono"', 'monospace'],
            }
        },
    },
    plugins: [],
}

