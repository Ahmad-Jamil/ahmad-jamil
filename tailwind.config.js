/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "#f8fafc",        // slate-50
          surface: "#ffffff",   // white
          muted: "#f1f5f9",     // slate-100
          border: "#e2e8f0",    // slate-200
          text: "#0f172a",      // slate-900
          textMuted: "#475569", // slate-600
          brand: "#2563eb",     // blue-600
          brandHover: "#1d4ed8",// blue-700
          accent: "#14b8a6",    // teal-500
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      boxShadow: {
        "soft": "0 8px 30px rgba(15, 23, 42, 0.08)",
        "brand-glow": "0 10px 30px rgba(37, 99, 235, 0.22)",
      },
    },
  },
  plugins: [],
}
