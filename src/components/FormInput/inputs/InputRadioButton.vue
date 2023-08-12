<template>
  <RadioGroup
    class="input-radio"
    :name="name"
    :defaultValue="defaultValue"
    v-model="value"
    :disabled="disabled || false"
  >
    <RadioGroupOption
      v-for="option in options"
      v-slot="{ checked }"
      class="input-radio__item"
      :key="option.id"
      :value="valueField ? option[valueField]  as (string | number | boolean | object): Number(option.id)"
      :title="option.label"
      :disabled="option.disabled || disabled || false"
      :class="{ 'input-radio__item--disabled': option.disabled || disabled }"
    >
      <SvgIcon
        class="input-radio__icon"
        :class="{
          'input-radio__icon--active': checked,
          'input-radio__icon--disabled': option.disabled || disabled,
        }"
        :name="getIconName(option.disabled, checked)"
      />
      <slot name="label" :option="option">{{ option.label }}</slot>
    </RadioGroupOption>
  </RadioGroup>
</template>
<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import { computed } from "vue";
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";
import type { TFormSelectOption } from "../FormInput.interface";

const props = defineProps<{
  name: string;
  modelValue: unknown;
  options: TFormSelectOption[];
  defaultValue?: unknown;
  disabled?: boolean;
  valueField?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(input) {
    emit("update:modelValue", input);
  },
});

const getIconName = (isDisabled: boolean | undefined, isChecked: boolean) => {
  if ((isDisabled || props.disabled) && isChecked) {
    return "radio-button";
  }
  if (isChecked) {
    return "radio-button-filled";
  }
  return "circle";
};
</script>
<style lang="scss">
.input-radio {
  &__item {
    padding: 8px 0;
    color: $text-placeholder;
    display: flex;
    align-items: center;
    &:focus-visible {
      outline: none;
      .input-radio__icon {
        border-radius: 50%;
        box-shadow: 0 0 0 4px $border-light-focused;
      }
    }
    &:hover {
      cursor: pointer;
    }
    &--disabled {
      &:hover {
        cursor: not-allowed;
      }
    }
  }
  &__icon {
    color: $border-light-02;
    margin-right: 8px;
    &--active {
      color: $button-primary;
    }
    &--disabled {
      color: $text-on-color-disabled;
      border-radius: 50%;
      & > path {
        fill: $button-disabled;
      }
    }
  }
}
</style>
