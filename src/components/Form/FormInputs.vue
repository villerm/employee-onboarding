<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    /** Number of columns in desktop view */
    desktopColumns?: number;
    columnTemplate?: string;
  }>(),
  {
    desktopColumns: 2,
    columnTemplate: "",
  }
);

const classes = computed(() => [
  "form-inputs",
  { "form-inputs--custom": props.columnTemplate.length },
]);
</script>

<style lang="scss">
.form-inputs__full {
  grid-column: 1/-1;
}
</style>

<style lang="scss" scoped>
.form-inputs {
  display: grid;
  gap: 1.5rem;

  @include media-breakpoint-up(desktop) {
    grid-template-columns: repeat(v-bind(desktopColumns), 1fr);
  }

  &--custom {
    @include media-breakpoint-up(desktop) {
      grid-template-columns: v-bind(columnTemplate);
    }
  }
}
</style>
