<script lang="ts" setup></script>

<template>
  <NuxtLayout>
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
  </NuxtLayout>
</template>

<style lang="scss">
.wrapper {
  max-width: 920px;
  margin: 0 auto;

  height: 100%;
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 16px;

  > div {
    max-width: 460px;
  }

  &-menu {
    display: flex;
    gap: 6px;
  }
}
</style>
