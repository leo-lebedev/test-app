/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{vue,ts,js,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                bg: '#f6f7f9',
                appBg: '#F8F7FA',
                text: '#111217',
                muted: '#8a9099',
                primary: '#1a5cff',
                danger: '#ff4d4f',
                border: '#e6e8ec',
            },
            borderRadius: {
                xl: '12px',
            },
        },
    },
    plugins: [],
}

