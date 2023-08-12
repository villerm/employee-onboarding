<template>
  <div>
    <Listbox
      class="listbox"
      as="div"
      :name="name"
      :disabled="disabled"
      :defaultValue="defaultValue"
      v-slot="{ open }"
      v-model="value"
      multiple
      static
    >
      <ListboxButton
        ref="listboxButton"
        :class="[
          'form-input__input',
          'form-input__input--select',
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
      {{ handleOpen(open) }}

      <div class="form-input__options-wrapper" v-if="listBoxOpen">
        <ListboxOptions
          as="ul"
          class="form-input__options"
          @keydown.tab="focusCTA"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="option in options"
            :key="option.id"
            :value="valueFiled ? option[valueFiled] : option"
            :disabled="option.disabled"
            as="template"
          >
            <li
              class="form-input__option"
              :class="{
                'form-input__option--active': active,
                'form-input__option--selected': selected,
                'form-input__option--disabled': option.disabled,
              }"
            >
              <SvgIcon :name="selected ? 'check' : 'square'" /><span
                >{{ option.label }}
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
        <div class="cta-box">
          <ActionButton
            ref="firstActionButton"
            :label="t('button.clearAll')"
            :type="EActionButtonType.SECONDARY"
            @click="handleClear"
            @keyup.esc="toggleList"
          />
          <ActionButton
            :label="t('button.apply')"
            :type="EActionButtonType.PRIMARY"
            @click="handleApply"
            @keyup.esc="toggleList"
          />
        </div>
      </div>
    </Listbox>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, nextTick } from "vue";
import type { EFormInputStatus } from "@/components/FormInput/FormInput.enums";
import { useI18n } from "vue-i18n";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";
import ActionButton from "@/components/ActionButton/ActionButton.vue";
import { EActionButtonType } from "@/components/ActionButton/ActionButton.enums";

import type { TFormSelectOption } from "../FormInput.interface";

const { t } = useI18n();
const props = defineProps<{
  name: string;
  disabled?: boolean;
  modelValue: TFormSelectOption[];
  defaultValue?: TFormSelectOption;
  options: TFormSelectOption[];
  placeholder?: string;
  status?: EFormInputStatus;
  valueFiled?: string;
}>();

const listboxButton = ref(null);
const firstActionButton = ref(null);
const listBoxOpen = ref(false);
const value = ref<TFormSelectOption[] | []>(props.modelValue || []);
const emit = defineEmits(["update:modelValue"]);

const selectLabel = computed(() => {
  if (props.modelValue) {
    if (props.valueFiled && props.modelValue.length) {
      const selectedOption = props.options?.filter((option) => {
        return props.modelValue?.includes(option[props.valueFiled]);
      });
      if (selectedOption) {
        return selectedOption.map((item) => item.label).join(", ");
      }
    }
    if (props.modelValue.length > 0) {
      return props.modelValue.map((item) => item.label).join(", ");
    }
    return props.placeholder;
  }
  if (props.defaultValue) {
    return props.defaultValue.label;
  }
  return props.placeholder;
});

const toggleList = () => {
  if (listboxButton.value) {
    listboxButton.value.$el?.click();
  }
};

const handleClear = () => {
  listBoxOpen.value = true;
  value.value = [];
  toggleList();
};
const handleOpen = (open: boolean) => {
  if (open && !listBoxOpen.value) {
    if (listBoxOpen.value === false) {
      value.value = props.modelValue || [];
    }
  }
  listBoxOpen.value = open;
};

const handleApply = () => {
  // Emit value only at Apply click
  emit("update:modelValue", value.value);
  listBoxOpen.value = false;
};

const focusCTA = () => {
  if (firstActionButton.value) {
    nextTick(() => {
      firstActionButton.value?.$el?.focus();
    });
  }
};
</script>

<style lang="scss" scoped>
.form-input__options-wrapper {
  position: absolute;
  top: 100%;
  width: 100%;
  max-height: 315px;
  margin: 0;
  @include elevation(1);
}
.form-input__options {
  padding: 0;
  margin: 0;
  max-height: 250px;
  overflow-y: auto;
}
.cta-box {
  display: flex;
  justify-content: center;
  padding: 12px 4px;
  @include elevation(1);
  button {
    margin: 0 4px;
  }
}
.form-input__option {
  display: flex;
  align-items: center;
  span {
    margin-left: 8px;
  }
  .svg-icon {
    color: transparent;
    border: 1px solid $border-light-02;
    border-radius: 4px;
  }
  &--selected {
    .svg-icon {
      border-radius: 4px;
      border: none;
      background: $button-primary;
      color: $white;
    }
  }
}
</style>
