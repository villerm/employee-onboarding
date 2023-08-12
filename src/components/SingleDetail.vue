<template>
  <div class="offer-detail">
    <span class="offer-detail__label">
      {{ label }}
    </span>
    <span class="offer-detail__value">
      <slot name="value">{{ value }}</slot>
    </span>
  </div>
  <slot name="value"></slot>
</template>
<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
}>();
</script>
<style lang="scss">
.offer-detail {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 2px solid $border-light-01;
  font-size: 1.125rem;
  &__label {
    color: $text-placeholder;
    font-weight: 500;
    width: 32%;
  }
  &__value {
    font-size: 1.25rem;
    padding-left: 1rem;
    width: 68%;
  }
  @include media-breakpoint-down(tablet) {
    justify-self: start;
    flex-direction: column;
    align-items: flex-start;
    &__label {
      width: 100%;
      margin-bottom: 0.5rem;
    }
    &__value {
      font-size: 1.125rem;
      padding-left: 0;
      width: 100%;
    }
  }
}
</style>
