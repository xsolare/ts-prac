<script lang="ts" setup>
import type { AppConfigInput } from 'nuxt/schema';

import UiModal from '#/components/common/modal/ui-modal.vue';
import UiSnackbar from '#/components/common/snackbar/ui-snackbar.vue';

const colorMode = useColorMode();
const app = useAppConfig() as AppConfigInput;

useHead({
  title: app.name as string,
  htmlAttrs: { lang: 'ru' },
  titleTemplate: '%s',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Jusangination'
    }
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
});
</script>

<template>
  <v-app>
    <v-theme-provider :theme="colorMode.preference">
      <ClientOnly>
        <NuxtPage />
        <v-no-ssr>
          <ui-snackbar />
          <ui-modal />
        </v-no-ssr>
      </ClientOnly>
    </v-theme-provider>
  </v-app>
</template>

<style lang="scss">
@include connectThemes($themes) using ($theme, $themeName) {
  .v-card-item__content {
    overflow: visible;
  }

  .v-application {
    padding-top: 64px;
    min-height: 100vh;
    background-color: #{map-get($theme, 'colors', 'bg-primary')};
  }
}
</style>
