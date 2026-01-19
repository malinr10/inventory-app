/** @type {import('tailwindcss').Config} */
export default {
  // Tambahkan baris ini di sini:
  darkMode: 'class', 
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af', 
        secondary: '#64748b', 
        success: '#10b981', 
        danger: '#ef4444', 
        background: '#f8fafc', 
      }
    },
  },
  plugins: [],
}