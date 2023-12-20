/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        "lighter-blue": "#E0F4FF",
        "light-blue": "#87C4FF",
        "normal-blue": "#39A7FF",
        "normal-beige": "#FFEED9",
      },
      width: {
        '3/10': '30%',
        '1/10': '10%',
        '6/10': '40%',
        '5/10': '50%',
        '2/10': '20%',
        '8/10': '80%'
      },
    },
  },
  plugins: [],
}
