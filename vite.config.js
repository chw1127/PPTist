import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        AutoImport({
            imports: ['vue', 'vue-router'],
            resolvers: [],
            eslintrc: {
                enabled: true
            }
        }),
        vueSetupExtend()
    ],
    css: {
        preprocessorOptions:{
            scss:{
              additionalData:`
              @import '@/assets/styles/variable.scss';
              @import '@/assets/styles/mixin.scss';
            `
            }
          }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        rollupOptions: {
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString()
                }
            }
        }
    }
});