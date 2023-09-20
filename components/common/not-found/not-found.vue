<script lang="ts" setup>
type Props = {
  title: string;
};

defineProps<Props>();
</script>

<template>
  <div class="not-found">
    <div class="cms">
      <v-icon class="cms-icon">mdi-cog-outline</v-icon>
    </div>
    <div class="face">
      <div class="band">
        <div class="red" />
        <div class="white" />
        <div class="blue" />
      </div>
      <div class="eyes" />
      <div class="dimples" />
      <div class="mouth" />
    </div>
    <h1>Oops! {{ title }}</h1>
  </div>
</template>

<style lang="scss" scoped>
$gb: #f2eee8;
$wh: #e7e7e7;
$dark: #383a41;
$red: #eb6d6d;
$blue: #5e7fdc;

$break: 400px;

*,
*:before,
*:after {
  box-sizing: content-box;
  transform: translate3d(0, 0, 0);
}

.not-found {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-top: 100px;
}

.cms {
  position: relative;
  width: 300px;

  &-icon {
    position: absolute;
    left: 55px;
    top: 10px;
    font-size: 12rem;
    color: $dark;
    margin: 0 auto;
    animation: rotate 4s infinite;
  }
}

@keyframes rotate {
  50% {
    transform: rotate(180deg);
  }
}

.face {
  width: 300px;
  height: 300px;
  border: 4px solid $dark;
  border-radius: 10px;
  background-color: $wh;
  margin: 0 auto;
  margin-top: 100px;
  z-index: 1;

  @media screen and (max-width: $break) {
    margin-top: 40px;
    transform: scale(0.8);
  }

  .band {
    width: 350px;
    height: 27px;
    border: 4px solid $dark;
    border-radius: 5px;
    margin-left: -25px;
    margin-top: 50px;

    .red {
      height: calc(100% / 3);
      width: 100%;
      background-color: $red;
    }

    .white {
      height: calc(100% / 3);
      width: 100%;
      background-color: $wh;
    }

    .blue {
      height: calc(100% / 3);
      width: 100%;
      background-color: $blue;
    }

    &:before {
      content: '';
      display: inline-block;
      height: 27px;
      width: 30px;
      background-color: rgba($wh, 0.3);
      position: absolute;
      z-index: 999;
    }

    &:after {
      content: '';
      display: inline-block;
      height: 27px;
      width: 30px;
      background-color: rgba($dark, 0.3);
      position: absolute;
      z-index: 999;
      right: 0;
      margin-top: -27px;
    }
  }

  .eyes {
    width: 128px;
    margin: 0 auto;
    margin-top: 40px;

    &:before {
      content: '';
      display: inline-block;
      width: 30px;
      height: 15px;
      border: 7px solid $dark;
      margin-right: 20px;
      border-top-left-radius: 22px;
      border-top-right-radius: 22px;
      border-bottom: 0;
    }

    &:after {
      content: '';
      display: inline-block;
      width: 30px;
      height: 15px;
      border: 7px solid $dark;
      margin-left: 20px;
      border-top-left-radius: 22px;
      border-top-right-radius: 22px;
      border-bottom: 0;
    }
  }

  .dimples {
    width: 180px;
    margin: 0 auto;
    margin-top: 15px;

    &:before {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-right: 80px;
      border-radius: 50%;
      background-color: rgba($red, 0.4);
    }

    &:after {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-left: 80px;
      border-radius: 50%;
      background-color: rgba($red, 0.4);
    }
  }

  .mouth {
    width: 40px;
    height: 5px;
    border-radius: 5px;
    background-color: $dark;
    margin: 0 auto;
    margin-top: 25px;
  }
}

h1 {
  font-weight: 800;
  color: var(--color-primary);
  text-align: center;
  font-size: 2.5em;
  padding-top: 20px;

  @media screen and (max-width: $break) {
    padding-left: 20px;
    padding-right: 20px;
    font-size: 2em;
  }
}
</style>
