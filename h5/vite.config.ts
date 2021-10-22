import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import styleImport from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig({//defineConfig 帮手函数，这样不用 jsdoc 注解也可以获取类型提示
  server: {
    port: 9000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    }
  },
  plugins: [vue(),
  styleImport({
    libs: [
      {
        libraryName: 'element-plus',
        esModule: true,
        ensureStyleFile: true,
        resolveStyle: (name) => {
          name = name.slice(3)
          return `element-plus/packages/theme-chalk/src/${name}.scss`;
        },
        resolveComponent: (name) => {
          return `element-plus/lib/${name}`;
        },
      },
      {
        libraryName: 'vant',
        esModule: true,
        resolveStyle: (name) => `vant/es/${name}/style`,
      },
    ],
  }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') },
  ],

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
