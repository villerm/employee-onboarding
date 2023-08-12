<template>
  <div :class="['form-input', { 'form-input--compact': compact }]">
    <label
      :for="name"
      class="form-input__label"
      :class="{
        'form-input__label--disabled': disabled,
        'form-input__label--error': status === 'error',
        'form-input__label--success': status === 'success',
        'form-input__label--checkbox': type === EFormInputType.CHECKBOX,
      }"
    >
      <span
        class="form-input__checkmark"
        v-if="type === EFormInputType.CHECKBOX"
      >
        <SvgIcon
          class="form-input__checkmark-icon"
          name="check"
          v-if="value"
          :class="{ 'form-input__checkmark-icon--disabled': disabled }"
        />
        <input
          :type="type"
          :name="name"
          :id="name"
          class="form-input__input form-input__input--checkbox"
          :class="{
            'form-input__input--disabled': disabled,
            'form-input__input--error': status === 'error',
            'form-input__input--success': status === 'success',
          }"
          :placeholder="placeholder"
          :disabled="disabled"
          :required="required"
          v-model="value"
        />
      </span>
      <slot name="label" :label="label">
        <span>{{ label }}</span>
      </slot>
      <span v-if="required" class="form-input__required">*</span>
      <span v-if="tooltip" class="form-input__tooltip">
        <PopperItem :tooltip-id="`${name}-tooltip`">
          <SvgIcon name="information-circle" />
          <template #content>
            {{ tooltip }}
          </template>
        </PopperItem>
      </span>
    </label>
    <input
      v-if="[EFormInputType.TEXT, EFormInputType.NUMBER].includes(type)"
      :type="type"
      :name="name"
      :id="name"
      class="form-input__input"
      :class="{
        'form-input__input--disabled': disabled,
        'form-input__input--error': status === 'error',
        'form-input__input--success': status === 'success',
      }"
      :placeholder="placeholder"
      :disabled="disabled"
      :min="min"
      :max="max"
      :required="required"
      v-model="value"
    />

    <InputFile
      v-if="type === EFormInputType.FILE"
      :name="name"
      :id="name"
      :class="{
        'form-input__input--disabled': disabled,
        'form-input__input--error': status === 'error',
        'form-input__input--success': status === 'success',
        'form-input__input--noresize': disableResize,
      }"
      :disabled="disabled"
      v-model="value"
    />

    <textarea
      v-if="type === EFormInputType.TEXTAREA"
      :name="name"
      :id="name"
      :rows="rows"
      :readonly="readonly"
      :maxlength="maxlength"
      class="form-input__input"
      :class="{
        'form-input__input--disabled': disabled,
        'form-input__input--error': status === 'error',
        'form-input__input--success': status === 'success',
        'form-input__input--noresize': disableResize,
      }"
      :placeholder="placeholder"
      :disabled="disabled"
      v-model="value"
    />

    <InputSelect
      v-if="type === EFormInputType.SELECT"
      :name="name"
      :disabled="disabled"
      :model-value="modelValue"
      :defaultValue="defaultValue"
      :options="options"
      :placeholder="placeholder"
      :status="status"
      :value-filed="valueFiled"
      @update:model-value="onUpdate"
    />

    <InputMultiSelect
      v-if="type === EFormInputType.MULTISELECT"
      :name="name"
      :disabled="disabled"
      :model-value="modelValue"
      :defaultValue="defaultValue"
      :options="options"
      :placeholder="placeholder"
      :status="status"
      :value-filed="valueFiled"
      @update:model-value="onUpdate"
    />

    <InputTelephone
      v-if="type === EFormInputType.TEL"
      :name="name"
      :disabled="disabled"
      :model-value="modelValue"
      :defaultValue="defaultValue"
      :placeholder="placeholder"
      :status="status"
      v-bind="$attrs"
      @update:model-value="onUpdate"
    />

    <InputRadioButton
      v-if="type === EFormInputType.RADIO"
      :name="name"
      :disabled="disabled"
      :model-value="modelValue"
      :defaultValue="defaultValue"
      :options="options"
      :placeholder="placeholder"
      :status="status"
      :value-field="valueFiled"
      @update:model-value="onUpdate"
    >
      <template #label="{ option }">
        <slot name="option-label" :option="option">
          {{ option.label }}
          <span v-if="option.tooltip" class="form-input__tooltip">
            <PopperItem :tooltip-id="`${option.id}-tooltip`">
              <SvgIcon name="information-circle" />
              <template #content>
                {{ option.tooltip }}
              </template>
            </PopperItem>
          </span>
        </slot>
      </template>
    </InputRadioButton>

    <InputPassword
      v-if="type === EFormInputType.PASSWORD"
      :name="name"
      :disabled="disabled"
      :model-value="modelValue"
      :required="required"
      :status="status"
      :placeholder="placeholder"
      @update:model-value="onUpdate"
    />

    <InputAutoFill
      v-if="type === EFormInputType.AUTOFILL"
      :name="name"
      :disabled="disabled"
      :model-value="modelValue"
      :options="options"
      :required="required"
      :status="status"
      :placeholder="placeholder"
      :value-filed="valueFiled"
      @update:model-value="onUpdate"
      @change:input="onChange"
    />

    <span
      v-if="helperText"
      class="form-input__helper"
      :class="{
        'form-input__helper--disabled': disabled,
        'form-input__helper--error': status === 'error',
        'form-input__helper--success': status === 'success',
      }"
    >
      {{ helperText }}
    </span>
    <span v-if="$slots['helper']" class="form-input__helper">
      <slot name="helper" />
    </span>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";
import InputSelect from "@/components/FormInput/inputs/InputSelect.vue";
import InputMultiSelect from "@/components/FormInput/inputs/InputMultiSelect.vue";
import InputTelephone from "@/components/FormInput/inputs/InputTelephone.vue";
import InputRadioButton from "@/components/FormInput/inputs/InputRadioButton.vue";
import InputPassword from "@/components/FormInput/inputs/InputPassword.vue";
import InputAutoFill from "@/components/FormInput/inputs/InputAutoFill.vue";

import {
  EFormInputStatus,
  EFormInputType,
} from "@/components/FormInput/FormInput.enums";

import type { TFormSelectOption } from "@/components/FormInput/FormInput.interface";
import InputFile from "@/components/FormInput/inputs/InputFile.vue";

const props = defineProps<{
  type: EFormInputType;
  name: string;
  label: string;
  modelValue?: unknown;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  status?: EFormInputStatus;
  rows?: number;
  maxlength?: number;
  readonly?: boolean;
  disableResize?: boolean;
  options?: TFormSelectOption[];
  defaultValue?: unknown;
  min?: number;
  max?: number;
  tooltip?: string;
  required?: boolean;
  firstIcon?: string;
  secondIcon?: string;
  compact?: boolean;
  hidden?: boolean;
  valueFiled?: string;
  minDate?: Date;
  maxDate?: Date;
}>();

const emit = defineEmits(["update:modelValue", "change:input"]);
// eslint-disable-next-line vue/no-setup-props-destructure
const selectValue = ref<unknown | undefined>(props.modelValue);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(input) {
    if (props.type === "select" && input) {
      selectValue.value = input as TFormSelectOption;
    }
    emit("update:modelValue", input);
  },
});

const onUpdate = (inputValue: unknown) => {
  emit("update:modelValue", inputValue);
};
const onChange = (input: unknown) => {
  emit("change:input", input);
};
</script>
