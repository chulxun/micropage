import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import styleImport,{ VantResolve } from 'vite-plugin-style-import'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9001,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    }
  },
  plugins: [vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      directoryAsNamespace: true,
    }),
    styleImport({
      resolves: [VantResolve()]
    })
  ],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') },
    ],
    // extensions: [ '.ts', '.vue', '.json','.js']

  },
  //build配置
  build: {
    assetsDir: 'js',
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        viewer: resolve(__dirname, 'viewer/index.html')
      },
      output: {
        manualChunks: {
          lodash: ['lodash'],
          'element-plus': ['element-plus'],
          vant: ['vant'],
          tinymce: ['tinymce'],
          swiper: ['swiper'],
        }
      }
    }
  },
})
