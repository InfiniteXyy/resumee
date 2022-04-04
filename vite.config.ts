import { defineConfig } from 'vite'
import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': `${resolve(__dirname, './src')}/`,
    },
  },
  publicDir: 'public',
  plugins: [
    react(),
    WindiCSS(),
    Icons({ compiler: 'jsx', jsx: 'react' }),
    AutoImport({ dts: './src/auto-import.d.ts', imports: ['react'] }),
    VitePWA({}),
    process.env.BUNDLE_ANALYZE && visualizer({ open: true }),
  ],
})
