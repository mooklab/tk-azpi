import { defineConfig } from 'vite'
import vueStatic from './plugins/vue-static.js'

const virtualEntry = {
    name: 'virtual-build-entry',

    resolveId(id) {
        if (id === 'virtual:build-entry') {
            return '\0virtual:build-entry'
        }
    },

    load(id) {
        if (id === '\0virtual:build-entry') {
            return ''
        }
    },

    generateBundle(_, bundle) {
        for (const [fileName, output] of Object.entries(bundle)) {
            if (
                output.type === 'chunk' &&
                output.isEntry &&
                output.facadeModuleId === '\0virtual:build-entry'
            ) {
                delete bundle[fileName]
            }
        }
    },
}

export default defineConfig({
    plugins: [
        vueStatic({
            pagesDir: 'src/pages',
            layout: 'src/Layout.vue',
            globalStyles: [
                'src/assets/sass/_global.sass',
            ],
            pageMeta: {
                'index.vue': {
                    title: 'Торговая компания АЗПИ - официальный дистрибьютор Алтайского завода прецизионных изделий, Роскомплект, УКР-Ростехника, Wuxi Weifu',
                    description: 'Топливная аппаратура и запасные части АЗПИ, Роскомплект, УКР-Ростехника, Wuxi Weifu. Торговая компания АЗПИ с 2006г. официальный дистрибьютор Алтайского завода прецизионных изделий. Поставки запчастей по РФ и СНГ напрямую с завода.',
                },
            },
        }),
        virtualEntry,
    ],

    build: {
        rollupOptions: {
            input: 'virtual:build-entry',
        },
    },
})