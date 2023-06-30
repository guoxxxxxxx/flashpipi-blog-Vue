import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';

// Vite 按需引入ant-design-vue组件
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
// 按需引入element-plus组件
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// 按需引入quasar组件库
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(
      {
        template: { transformAssetUrls }
      }
    ),
    quasar({
      sassVariables: 'src/quasar-variables.sass'
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [AntDesignVueResolver(), ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0'
  }
})
