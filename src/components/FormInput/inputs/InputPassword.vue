<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div>
    <input
      :type="currentType"
      :name="name"
      :id="name"
      class="form-input__input form-input__input--password"
      :class="{
        'form-input__input--disabled': disabled,
        'form-input__input--error': status === 'error',
        'form-input__input--success': status === 'success',
      }"
      :disabled="disabled"
      :required="required"
      :placeholder="placeholder"
      v-model="value"
    />
    <div
      class="form-input__password-button"
      :class="{ 'form-input__password-button--disabled': disabled }"
      role="button"
      tabindex="0"
      aria-label="show password"
      @keydown.enter="handleClick"
      @click="handleClick"
    >
      <SvgIcon :name="currentType === 'password' ? 'eye' : 'eye-off'" />
    </div>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";
import {
  EFormInputStatus,
  EFormInputType,
} from "@/components/FormInput/FormInput.enums";
import { computed, ref } from "vue";

const props = defineProps<{
  name: string;
  disabled?: boolean;
  modelValue?: string;
  required?: boolean;
  status?: EFormInputStatus;
  placeholder?: string;
}>();
const emit = defineEmits(["update:modelValue"]);

const currentType = ref<EFormInputType>(EFormInputType.PASSWORD);
const value = computed({
  get() {
    return props.modelValue;
  },
  set(input) {
    emit("update:modelValue", input);
  },
});

const handleClick = () => {
  if (!props.disabled) {
    if (currentType.value === EFormInputType.PASSWORD) {
      currentType.value = EFormInputType.TEXT;
    } else {
      currentType.value = EFormInputType.PASSWORD;
    }
  }
};
</script>
<style></style>
