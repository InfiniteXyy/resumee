import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'public',
  plugins: [
    react(),
    WindiCSS(),
    Icons({ compiler: 'jsx', jsx: 'react' }),
    AutoImport({ dts: './src/auto-import.d.ts', imports: ['react'] }),
  ],
})
