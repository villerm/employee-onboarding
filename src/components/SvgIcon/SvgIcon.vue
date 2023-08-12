<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    :aria-labelledby="name"
    role="img"
    class="svg-icon"
  >
    <title :id="name" lang="en">{{ name }} icon</title>
    <component :is="icon" />
  </svg>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";

const props = defineProps<{
  name: string;
}>();

const icon = computed(() => {
  const iconName = props.name
    .split("-")
    .map((string) => string.charAt(0).toUpperCase() + string.slice(1))
    .join("");
  // const iconFile = `./icons/Icon${iconName}.vue`;
  if (iconName) {
    return defineAsyncComponent(() => import(`./icons/Icon${iconName}.vue`));
  }
  return "";
});
</script>
<style scoped>
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: none;
}
</style>
