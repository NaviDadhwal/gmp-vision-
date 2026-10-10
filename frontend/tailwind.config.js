/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1F56A8",
          primaryHover: "#164486",
          dark: "#16233F",
          navy: "#1B2B4B",
          muted: "#5B6B82",
          border: "#E4E9F1",
          soft: "#F4F7FC",
          mint: "#F3F9EE",
          green: "#79B82E",
          greenDeep: "#4E8A1C",
          whatsapp: "#25D366",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Public Sans", "Space Grotesk", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'hud': '0 0 15px rgba(31, 86, 168, 0.08)',
        'hud-green': '0 0 15px rgba(121, 184, 46, 0.12)',
        'hud-hover': '0 10px 25px -5px rgba(22, 35, 63, 0.08), 0 8px 10px -6px rgba(22, 35, 63, 0.04)',
      },
    },
  },
  plugins: [],
}
