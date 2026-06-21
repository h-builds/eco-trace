import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    environment: 'happy-dom',
    exclude: [
      'test/e2e-*.test.ts',
      'test/stress-*.test.ts',
      'test/a11y.test.ts',
      'node_modules/**'
    ]
  }
})
