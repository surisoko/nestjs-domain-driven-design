import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    poolOptions: {
      forks: {
        singleFork: true,
      }
    },
    include: ['**/*.spec.ts'],
    alias: {
      '@src': './src',
      '@test': './tests',
    },
    globals: true,
    root: './',
  },
  resolve: {
    alias: {
      '@src': './src',
      '@test': './tests',
    },
  },
  plugins: [
    swc.vite(),
  ],
})
