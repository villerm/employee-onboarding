<template>
  <div class="form-input__input form-input__input--file">
    <input
      aria-label="Upload file"
      ref="fileInput"
      type="file"
      :name="name"
      multiple
      @change="previewFiles"
      style="visibility: hidden; position: absolute"
    />
    <action-button
      :disabled="disabled"
      v-if="!selectedFile"
      @click="click"
      first-icon="arrow-up-circle"
      :label="t('button.chooseFile')"
    >
    </action-button>
    <span class="file-label">
      <template v-if="selectedFile"> {{ selectedFile?.name }}</template>
      <template v-else> {{ t("form.fileNotSelected") }}</template>
    </span>
    <button
      type="button"
      v-if="selectedFile"
      class="input-clear"
      @click="removeFile"
    >
      <SvgIcon name="close" />
    </button>
  </div>
</template>
<script setup lang="ts">
import ActionButton from "@/components/ActionButton/ActionButton.vue";
import { ref } from "vue";
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps<{
  name: string;
  disabled?: boolean;
}>();

const fileInput = ref();
const selectedFile = ref();

const click = (event: Event) => {
  if (!selectedFile.value) {
    fileInput.value.click();
    event.stopPropagation();
  }
};

function previewFiles(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    // eslint-disable-next-line prefer-destructuring
    selectedFile.value = target.files[0];
  }
}

const removeFile = () => {
  selectedFile.value = undefined;
};
</script>
<style lang="scss" scoped>
.form-input__input--file {
  display: flex;
  justify-content: start;
  align-items: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px $border-light-focused;
  }
}
.file-label {
  flex-grow: 2;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.input-clear {
  background: none;
  border: none;
  font-size: 24px;
  justify-self: end;
  cursor: pointer;
}
</style>
