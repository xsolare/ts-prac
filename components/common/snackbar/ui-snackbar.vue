<script lang="ts" setup>
import type { WritableComputedRef } from 'vue';

import { useSnackbarStore } from '#/store/component/ui-snackbar.store';

const snackbarStore = useSnackbarStore();
const isOpen: WritableComputedRef<boolean> = computed({
  get: () => snackbarStore._isOpen,
  set: (value) => snackbarStore.setIsOpen(value)
});
</script>

<template>
  <v-snackbar
    v-model="isOpen"
    :color="snackbarStore.data.type ?? 'primary'"
    :timeout="snackbarStore.timeout">
    <div class="snackbar-text">
      {{ snackbarStore.data.title }}
    </div>
  </v-snackbar>
</template>

<style lang="scss" scoped>
.snackbar-text {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}
</style>
