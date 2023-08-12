<template>
  <div class="card-section">
    <h2
      v-if="title"
      :class="['card-section__section-title', { h4: !grid.desktop }]"
    >
      {{ title }}
    </h2>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import useLayout from "@/composables/layout/layout";

const { grid } = useLayout();

defineProps<{
  title?: string;
}>();
</script>

<style lang="scss">
.card-section {
  background: $white;
  border-radius: 2rem;
  padding: 2.5rem 2rem;
  @include elevation(1);
  &__section-title {
    color: $brand-primary;
    margin: 0 0 1rem;
    font-weight: 500;
  }
  .offer-detail {
    &:last-of-type {
      border-bottom: none;
    }
  }
  @include media-breakpoint-down(tablet) {
    padding: 1.5rem 1rem;
    border-radius: 1rem;
  }
}
</style>
