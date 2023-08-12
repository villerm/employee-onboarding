<template>
  <router-link :class="buttonClasses" :disabled="disabled" v-if="to" :to="to">
    <SvgIcon
      v-if="firstIcon"
      :name="firstIcon"
      class="button__icon button__icon--first"
    />
    <template v-if="!iconOnly">
      <slot>
        {{ props.label }}
      </slot>
    </template>
    <SvgIcon
      v-if="secondIcon"
      :name="secondIcon"
      class="button__icon button__icon--second"
    />
  </router-link>
  <button
    v-else
    :type="submit ? 'submit' : 'button'"
    :class="buttonClasses"
    :disabled="disabled"
  >
    <SvgIcon
      v-if="firstIcon"
      :name="firstIcon"
      class="button__icon button__icon--first"
    />
    <template v-if="!iconOnly">
      <slot>
        {{ props.label }}
      </slot>
    </template>
    <SvgIcon
      v-if="secondIcon"
      :name="secondIcon"
      class="button__icon button__icon--second"
    />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { RouteLocationRaw } from "vue-router";
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";
import useLayout from "@/composables/layout/layout";
import {
  EActionButtonType,
  EActionButtonSize,
} from "@/components/ActionButton/ActionButton.enums";

const { grid } = useLayout();

const props = withDefaults(
  defineProps<{
    label?: string;
    type?: EActionButtonType;
    size?: EActionButtonSize;
    disabled?: boolean;
    firstIcon?: string;
    secondIcon?: string;
    responsive?: boolean;
    fullWidth?: boolean;
    submit?: boolean;
    /** If value is provided the button is rendered as `router-link` with button styles */
    to?: RouteLocationRaw;
  }>(),
  {
    label: "",
    type: EActionButtonType.SECONDARY,
    size: EActionButtonSize.MEDIUM,
    firstIcon: undefined,
    secondIcon: undefined,
    to: undefined,
  },
);

const iconOnly = computed(() => {
  if (!props.responsive) return false;
  return grid.breakpoint === "mobile";
});

const buttonClasses = computed(() => {
  return [
    "button",
    `button--${props.type}`,
    `button--${props.size}`,
    {
      "button--no-label": !props.label || iconOnly.value,
      "button--full-width": props.fullWidth,
    },
  ];
});
</script>

<style lang="scss">
@mixin buttonStyle(
  $bg: $button-secondary,
  $text: $text-primary,
  $border: none,
  $bg-hover: $button-secondary-hover,
  $text-hover: $text,
  $border-hover: $border,
  $bg-active: $button-secondary-active,
  $text-active: $text,
  $bg-disabled: $button-disabled,
  $text-disabled: $text-on-color-disabled,
  $border-disabled: none
) {
  background-color: $bg;
  border: $border;
  color: $text;

  &:hover {
    cursor: pointer;
    background-color: $bg-hover;
    color: $text-hover;
  }

  &:active {
    background-color: $bg-active;
    color: $text-hover;
  }

  &:disabled {
    color: $text-disabled;
    background-color: $bg-disabled;
    border: $border-disabled;
    &:hover {
      background-color: $bg-disabled;
      cursor: not-allowed;
    }
  }

  @at-root a:visited#{&} {
    color: $text;
  }
}

.button {
  border: none;
  padding: 11px 24px;
  border-radius: $border-radius;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  display: inline-flex;
  font-size: 1rem;
  line-height: 1.125rem;
  font-weight: 600;
  // height: 100%;
  min-width: 10.5rem;

  @include buttonStyle();

  &:focus-visible {
    box-shadow: 0 0 0 4px $focus;
    outline: 0;
  }

  &--primary {
    @include buttonStyle(
      $bg: $button-primary,
      $text: $text-on-color,
      $bg-hover: $button-primary-hover,
      $bg-active: $button-primary-active
    );
  }

  &--large {
    font-size: 1.25rem;
    line-height: 1.5rem;
    padding: 16px 26px;
    svg {
      font-size: 1.5rem;
      path {
        stroke-width: 2;
      }
    }
  }

  &--tertiary {
    @include buttonStyle(
      $bg: $white,
      $text: $button-tertiary,
      $border: 1px solid $border-light-03,
      $text-hover: $button-tertiary-hover,
      $bg-hover: $white,
      $text-active: $button-tertiary-active,
      $bg-disabled: $white,
      $text-disabled: $text-on-color-disabled,
      $border-disabled: 1px solid $button-disabled
    );
  }

  &--full-width {
    width: 100%;
    justify-content: center;
  }

  &--no-label {
    padding: 10px;
    min-width: auto;
  }
}

.button__icon {
  font-size: 1.25rem;
  margin: -1px 0;

  &--first {
    margin-right: 10px;
  }
  &--second {
    margin-left: 10px;
  }

  .button--no-label & {
    margin: 0;
  }
}
</style>
