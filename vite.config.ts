import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solidPlugin()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "sass:color"; @import "./src/styles/variables.scss";'
      }
    }
  }
})
