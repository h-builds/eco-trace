import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // @ts-ignore - Vapor mode is experimental and may not be in standard types yet
      features: {
        vapor: true
      }
    })
  ]
});
