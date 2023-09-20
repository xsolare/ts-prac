<script lang="ts" setup>
import type { WritableComputedRef } from 'vue';

import { useModalStore } from '#/store/component/ui-modal.store';

const modalStore = useModalStore();
const isOpen: WritableComputedRef<boolean> = computed({
  get: () => modalStore._isOpen,
  set: (value) => modalStore.setIsOpen(value)
});
</script>

<template>
  <v-dialog v-model="isOpen" persistent width="auto">
    <v-card>
      <v-alert
        :type="modalStore.data.type ?? 'success'"
        :title="modalStore.data.title"
        :text="modalStore.data.content">
        <v-card-actions class="mt-4">
          <v-spacer />
          <v-btn
            @click="
              () => {
                isOpen = false;
                modalStore.data.cancelCallback?.();
              }
            ">
            {{ modalStore.data.cancelText }}
          </v-btn>
          <v-btn
            @click="
              () => {
                isOpen = false;
                modalStore.data.okCallback?.();
              }
            ">
            {{ modalStore.data.okText }}
          </v-btn>
        </v-card-actions>
      </v-alert>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
