<script lang="ts" setup>
import { useAppStore } from '../store/common/app.store';

interface IValue {
  title: string;
  value: string;
}

const nuxtApp = useNuxtApp();
const { switchTheme } = useAppStore();

const drawer = ref<boolean>(false);
const loading = ref<boolean>(false);

const items = ref<IValue[]>([
  {
    title: 'Typescript',
    value: '/typescript'
  }
]);

const icons = [{ icon: 'mdi-github', link: 'https://github.com/xsolare/ts-prac' }];

nuxtApp.hook('page:start', () => {
  loading.value = true;
});
nuxtApp.hook('page:finish', () => {
  loading.value = false;
});
</script>

<template>
  <v-app-bar color="primary" prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
    <v-toolbar-title> xSolare </v-toolbar-title>
    <v-spacer />

    <v-btn variant="text" icon="mdi-theme-light-dark" @click="switchTheme" />
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" rail rail-width="450" location="left">
    <v-list>
      <v-list-item
        v-for="(v, i) in items"
        :key="i"
        :title="v.title"
        :value="v.value"
        @click="navigateTo(v.value)" />
    </v-list>
  </v-navigation-drawer>

  <slot />

  <v-footer class="footer">
    <div>
      <v-btn
        v-for="{ icon, link } in icons"
        :key="icon"
        class="mx-1"
        :icon="icon"
        variant="text"
        @click="navigateTo(link, { external: true })" />
    </div>

    <div>{{ new Date().getFullYear() }} — <strong>xSolare</strong></div>
  </v-footer>
</template>

<style lang="scss">
@include connectThemes($themes) using ($theme, $themeName) {
  nav {
    background-color: #{map-get($theme, 'colors', 'bg-side-panel')} !important;
  }

  .footer {
    background-color: #{map-get($theme, 'colors', 'bg-side-panel')} !important;
    display: flex;
    flex-direction: column;
  }
}
</style>
