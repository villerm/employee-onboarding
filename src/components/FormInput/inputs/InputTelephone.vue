<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div
    class="form-input__input form-input__input--tel"
    :class="{
      'form-input__input--disabled': disabled,
      'form-input__input--error': status === 'error',
      'form-input__input--success': status === 'success',
    }"
  >
    <div class="telselect-wrapper">
      <Listbox v-slot="{ open }" :disabled="disabled" v-model="phonePrefix">
        <ListboxButton
          class="form-input__input form-input__input--telselect"
          :class="{
            'form-input__input--disabled': disabled,
          }"
          v-slot="{ value }"
        >
          <span class="">+{{ value }}</span>
          <SvgIcon
            :name="open ? 'arrow-up' : 'arrow-down'"
            class="form-input__icon form-input__icon--telselect"
          />
        </ListboxButton>
        <ListboxOptions class="form-input__options-wrapper">
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="option in countryCodes"
            :key="option.code"
            :value="option.dial_code"
            class="form-input__option"
            as="template"
          >
            <li
              :class="{
                'form-input__option--active': active,
                'form-input__option--selected': selected,
              }"
            >
              <span> +{{ option.dial_code }} </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>
    <input
      type="text"
      :name="name"
      :id="name"
      class="form-input__input form-input__input--telnumber"
      :class="{
        'form-input__input--disabled': disabled,
      }"
      :placeholder="placeholder"
      :disabled="disabled"
      v-model="phoneNumber"
    />
  </div>
</template>
<script setup lang="ts">
import type { EFormInputStatus } from "@/components/FormInput/FormInput.enums";
import { computed, onMounted } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";

import countryCodes from "@/components/FormInput/inputs/CountryCodes.json";
import type { TTelInputPrefix, TTelInputValue } from "../FormInput.interface";

const props = defineProps<{
  name: string;
  disabled?: boolean;
  modelValue?: TTelInputValue; // v-model
  prefix?: number; // v-model:prefix
  phone?: string; // v-model:phone
  defaultValue?: TTelInputPrefix;
  placeholder?: string;
  status?: EFormInputStatus;
}>();

const emit = defineEmits([
  "update:modelValue",
  "update:phone",
  "update:prefix",
]);

const phonePrefix = computed({
  get() {
    if (props.prefix) {
      return props.prefix;
    }
    if (props.modelValue?.phonePrefix) {
      return props.modelValue.phonePrefix;
    }
    return props.defaultValue?.dial_code || 372;
  },
  set(input) {
    emit("update:prefix", Number.parseInt(input as string, 10));
    emit("update:modelValue", {
      ...props.modelValue,
      phonePrefix: Number.parseInt(input as string, 10),
    });
  },
});

const phoneNumber = computed({
  get() {
    // v-model:phone
    if (props.phone) {
      return props.phone;
    }
    if (props.modelValue) {
      return props.modelValue.phone;
    }
    return "";
  },
  set(input) {
    emit("update:phone", input);
    emit("update:modelValue", {
      ...props.modelValue,
      phone: input,
      phonePrefix: phonePrefix.value,
    });
  },
});

onMounted(() => {
  emit("update:prefix", phonePrefix.value);
});
</script>
