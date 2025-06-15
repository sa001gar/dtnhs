import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [
    tailwindcss({
      config: './tailwind.config.ts', // or .js if that's what you use
    }),
    autoprefixer(),
  ]
}
