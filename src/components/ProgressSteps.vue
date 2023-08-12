<template>
  <div class="step-progress">
    <div class="step-progress__wrapper">
      <div class="step-progress__bar">
        <div
          class="step-progress__step"
          v-for="step in stepsCount"
          :key="step"
          :class="{
            'step-progress__step--active': currentStep === step,
            'step-progress__step--valid': currentStep > step,
          }"
        >
          <div class="step-progress__step-icon" v-if="currentStep > step">
            <SvgIcon :name="icon || 'check'" />
          </div>
          <div class="step-progress__step-label" v-else>{{ step }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";

defineProps<{
  currentStep: number;
  stepsCount: number;
  icon?: string;
}>();
</script>
<style lang="scss">
.step-progress {
  margin: 24px auto;
  &__wrapper {
    display: flex;
    position: relative;
    flex-wrap: wrap;
  }
  &__bar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  &__step {
    z-index: 2;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    width: 48px;
    margin: 0 31px;
    background-color: $white;
    border-radius: 50%;
    box-shadow: inset 0px 0px 0px 1px $border-light-02;
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      width: 38px;
      left: calc(100% + 13px);
      height: 4px;
      border-radius: 1rem;
      background: $border-light-01;
    }
    &--active {
      background-color: $surface-dark-01;
      box-shadow: inset 0px 0px 0px 2px $white;
      .step-progress__step-label {
        color: $white;
        font-weight: 600;
      }
    }
    &--valid {
      background-color: $white;
      box-shadow: inset 0px 0px 0px 2px $surface-dark-01;
      &:after {
        background-color: $surface-dark-01;
      }
    }
    &:first-of-type {
      margin-left: 0;
    }
    &:last-of-type {
      margin-right: 0;
      &:after {
        content: none;
      }
    }
  }
  &__step-label {
    white-space: nowrap;
    font-size: 1.25rem;
    color: $text-placeholder;
  }
  &__step-icon {
    display: flex;
    font-size: 1.375rem;
    color: $surface-dark-01;
    svg {
      path {
        stroke-width: 2px;
      }
    }
  }
}
</style>
