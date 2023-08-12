<template>
  <div>
    <Listbox
      :name="name"
      :disabled="disabled || false"
      :defaultValue="defaultValue"
      v-slot="{ open }"
      v-model="value"
    >
      <ListboxButton
        :class="[
          'form-input__input form-input__input--select',
          {
            'form-input__input--disabled': disabled,
            'form-input__input--error': status === 'error',
            'form-input__input--success': status === 'success',
          },
        ]"
      >
        {{ selectLabel }}
        <SvgIcon
          :name="open ? 'arrow-up' : 'arrow-down'"
          class="form-input__icon"
        />
      </ListboxButton>
      <ListboxOptions class="form-input__options-wrapper">
        <ListboxOption
          v-slot="{ active, selected }"
          v-for="option in options"
          :key="option.id"
          :value="
            valueFiled && !returnObject ? option[valueFiled] : (option as any)
          "
          :disabled="option.disabled || false"
          :class="[
            'form-input__option',
            { 'form-input__option--disabled': option.disabled },
          ]"
          as="template"
        >
          <li
            :class="{
              'form-input__option--active': active,
              'form-input__option--selected': selected,
            }"
          >
            <span>
              {{ option.label }}
            </span>
          </li>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import type { EFormInputStatus } from "@/components/FormInput/FormInput.enums";

import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";
import type { TFormSelectOption } from "../FormInput.interface";

const props = defineProps<{
  name: string;
  disabled?: boolean;
  modelValue?: TFormSelectOption;
  defaultValue?: TFormSelectOption;
  options?: TFormSelectOption[];
  placeholder?: string;
  status?: EFormInputStatus;
  valueFiled?: string;
  returnObject?: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const selectLabel = computed(() => {
  if (props.modelValue !== undefined) {
    if (props.valueFiled) {
      const selectedOption = props.options?.find((option) => {
        return option[props.valueFiled as string] === props.modelValue;
      });
      if (selectedOption) {
        return selectedOption.label;
      }
    }
    return props.modelValue?.label || props.placeholder;
  }
  if (props.defaultValue) {
    if (props.valueFiled) {
      const selectedOption = props.options?.find((option) => {
        return (
          option[props.valueFiled as string] ===
          parseInt(String(props.modelValue), 10)
        );
      });
      if (selectedOption) {
        return selectedOption.label;
      }
    }
    return props.defaultValue.label;
  }
  return props.placeholder;
});

const value = computed({
  get() {
    if (props.valueFiled && props.modelValue) {
      return props.options?.find((option) => {
        return (
          option[props.valueFiled as string] ===
          parseInt(String(props.modelValue), 10)
        );
      });
    }
    return props.modelValue;
  },
  set(input) {
    emit("update:modelValue", input);
  },
});
</script>
