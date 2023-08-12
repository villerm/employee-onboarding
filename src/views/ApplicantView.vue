<template>
  <div class="applicant-page">
    <div class="applicant-page__bg"></div>
    <div class="applicant-page__content">
      <RouterView />
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style lang="scss" scoped>
.applicant-page {
  background: url("@/assets/img/dot-bg.jpeg"), repeat, #fff;
  overflow: auto;
  &__bg {
    position: fixed;
    margin-left: calc(-50vw + 50%);
    width: 100vw;
    height: 300%;
    top: 0;
    left: 0;
    background: linear-gradient(
      164deg,
      #135ab7 0%,
      rgba(255, 219, 219, 0) 100%
    );
  }
}
.progress {
  margin: 3rem 0;
}
</style>
