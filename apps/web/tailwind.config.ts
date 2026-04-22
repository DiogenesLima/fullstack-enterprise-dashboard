import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    "./app/**/*.{vue,js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // Define the brand color palette (e.g., Enterprise Blue)
      colors: {
        enterprise: {
          50: '#f0f7ff',
          900: '#1e3a8a',
        }
      }
    },
  },
  plugins: [],
}
