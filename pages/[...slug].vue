<script lang="ts" setup></script>

<template>
  <NuxtLayout>
    <div class="page">
      <div class="content">
        <div class="content-wrapper">
          <ContentDoc>
            <template #not-found>
              <div class="intro">
                <div>Practices Penetration special for you</div>
                <div class="intro-menu">
                  <v-btn variant="tonal" @click="navigateTo('/typescript')">typescript</v-btn>
                </div>
              </div>
            </template>
          </ContentDoc>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
@include connectThemes($themes) using ($theme, $themeName) {
  .page {
    min-height: calc(100vh - 170px);
  }

  .content {
    padding: 6px;
    max-width: 920px;
    margin: 0 auto;

    &-wrapper {
      overflow-wrap: break-word;
      width: 100%;
    }
  }

  .intro {
    color: #{map-get($theme, 'colors', 'text-primary')};

    margin-top: 25%;
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
}
</style>
