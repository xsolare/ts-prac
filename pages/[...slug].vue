<script lang="ts" setup></script>

<template>
  <div class="wrapper">
    <ContentDoc>
      <template #not-found>
        <div class="intro">
          <div>TS Penetration special for you</div>
          <div class="intro-menu">
            <v-btn variant="tonal" @click="navigateTo('/prac')">ju-TS-ang</v-btn>
          </div>
        </div>
      </template>
    </ContentDoc>
  </div>
</template>

<style lang="scss">
.wrapper {
  height: 100%;
  padding: 10px;
  max-width: 920px;
  margin: 0 auto;
}
</style>
