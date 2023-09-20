import { resolve } from 'path';

export default defineNuxtConfig({
  //* enable ssr for rendering
  ssr: true,

  //* auto import components
  // components: [],
  // imports: {},

  build: {
    transpile: ['vuetify']
  },

  content: {
    documentDriven: true,
    highlight: {
      theme: {
        dark: 'github-dark',
        default: 'github-light'
      }
    }
  },

  //* config vite with vuetify
  vite: {
    ssr: {
      noExternal: ['vuetify']
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "./assets/scss/variables.scss";
          `
        }
      }
    }
  },

  //* modules
  modules: ['@nuxt/content', '@nuxtjs/color-mode', '@pinia/nuxt'],

  pinia: {
    autoImports: ['storeToRefs', 'defineStore']
  },

  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.min.css', '#/assets/scss/global.scss'],

  alias: {
    '#': resolve(__dirname, '.'),
    '~': resolve(__dirname, './node_modules')
  },

  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  }
});
