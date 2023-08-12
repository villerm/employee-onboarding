<template>
  <div class="spinner-wrapper">
    <div class="spinner" :style="containerStyle">
      <svg class="spinner__border" viewBox="0 0 50 50">
        <circle
          class="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="5"
        ></circle>
      </svg>
      <svg class="spinner__circle" viewBox="0 0 50 50">
        <circle
          class="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="5"
        ></circle>
      </svg>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  size?: number;
}>();

const containerStyle = computed(() => {
  if (props.size && props.size > 1) {
    return {
      height: `${props.size}px`,
      width: `${props.size}px`,
    };
  }
  return { width: "42px", height: "42px" };
});
</script>
<style lang="scss" scoped>
.spinner {
  display: inline-flex;
  position: relative;
  overflow: hidden;
  &-wrapper {
    height: 500px;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__border {
    height: 100%;
    width: 100%;
    z-index: 1;
    position: absolute;
    & .path {
      stroke-linecap: round;
      stroke: transparent;
    }
  }
  &__circle {
    animation: rotate 2s linear infinite;
    height: 100%;
    width: 100%;
    z-index: 2;
    position: absolute;
    & .path {
      stroke: $white;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }
  }
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
