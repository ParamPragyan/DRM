/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        neomorphism: '8px 8px 16px #bebebe, -8px -8px 16px #ffffff',
      },
    },
  },
  plugins: [],
};
