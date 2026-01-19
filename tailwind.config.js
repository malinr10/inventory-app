/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af', // Biru Tua Professional
        secondary: '#64748b', // Abu-abu Netral
        success: '#10b981', // Hijau Bold
        danger: '#ef4444', // Merah Error
        background: '#f8fafc', // Putih Kebiruan (Sangat clean)
      }
    },
  },
  plugins: [],
}