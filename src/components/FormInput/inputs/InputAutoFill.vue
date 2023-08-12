<template>
  <div>
    <Combobox v-model="value" nullable>
      <ComboboxInput
        :name="name"
        :disabled="disabled"
        @change="handleChange($event.target.value)"
        class="form-input__input form-input__input--select"
        :displayValue="(option) => option?.label || ''"
        :placeholder="placeholder"
        :class="{
          'form-input__input--disabled': disabled,
          'form-input__input--error': status === 'error',
          'form-input__input--success': status === 'success',
        }"
      />

      <ComboboxOptions class="form-input__options-wrapper">
        <div
          v-if="filteredOptions?.length === 0 && query !== ''"
          class="search-result"
        >
          {{ t("search.nothingFound") }}
        </div>

        <ComboboxOption
          v-slot="{ active, selected }"
          v-for="option in filteredOptions"
          :key="option.id"
          :value="valueFiled ? option[valueFiled] : option"
          class="form-input__option"
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
        </ComboboxOption>
      </ComboboxOptions>
    </Combobox>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import type { EFormInputStatus } from "@/components/FormInput/FormInput.enums";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/vue";

import type { TFormSelectOption } from "../FormInput.interface";

const { t } = useI18n();
const props = defineProps<{
  name: string;
  disabled?: boolean;
  modelValue?: TFormSelectOption;
  defaultValue?: TFormSelectOption;
  options?: TFormSelectOption[];
  placeholder?: string;
  status?: EFormInputStatus;
  valueFiled?: string;
}>();

const emit = defineEmits(["update:modelValue", "change:input"]);
const value = computed({
  get() {
    if (props.valueFiled && props.options) {
      return props.options.find((option) => {
        return option[props.valueFiled as string] === props.modelValue;
      });
    }
    return props.modelValue;
  },
  set(input) {
    emit("update:modelValue", input);
  },
});

const query = ref("");

const filteredOptions = computed(() =>
  query.value === ""
    ? props.options
    : props.options?.filter((option) => {
        return option.label.toLowerCase().includes(query.value.toLowerCase());
      })
);

const handleChange = (input: string) => {
  query.value = input;
  emit("change:input", input);
};

watch(
  () => props.modelValue,
  () => {
    value.value = props.modelValue;
  }
);
</script>
<style scoped lang="scss">
.search-result {
  padding: 12px 16px;
}
</style>
