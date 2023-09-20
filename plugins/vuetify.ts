/*
 * Vuetify3 Plugin
 */

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { ru } from 'vuetify/locale';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    defaults: {
      global: {
        ripple: true
      }
    },

    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi
      }
    },

    locale: {
      locale: 'ru',
      fallback: 'ru',
      messages: { ru }
    },

    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#313131',
            secondary: '#eaeff8',
            'border-primary': '#878787',
            'border-secondary': '#eaeff8',
            'text-primary': '#242555',
            'text-secondary': '#4c4d76'
          }
        },
        dark: {
          dark: true,
          colors: {
            primary: '#010409',
            secondary: '#0d1117',
            'border-primary': '#625e7e',
            'border-secondary': '#373648',
            'text-primary': '#f3f3f3',
            'text-secondary': '#dfdfdf'
          }
        }
      }
    },

    components,
    directives
  });

  nuxtApp.vueApp.use(vuetify);
});
