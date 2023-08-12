<template>
  <div :class="formSectionClasses">
    <h2 v-if="title" class="form-section__title">
      <slot name="title">
        {{ title }}

        <SvgIcon name="information-circle" />
      </slot>
    </h2>
    <p
      v-if="requiredLabel"
      class="form-section__subtitle form-section__subtitle--required"
    >
      {{ t("form.requiredFields") }}
    </p>
    <SpaceLayout
      v-if="$slots['actions']"
      justify="center"
      :vertical="!grid.tablet"
    >
      <slot name="actions" />
    </SpaceLayout>
    <!-- default slot-->
    <slot v-else name="sectionContent">
      <FormInputs v-bind="formInputsParams">
        <slot />
      </FormInputs>
    </slot>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import FormInputs from "@/components/Form/FormInputs.vue";
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";
import useLayout from "@/composables/layout/layout";

const props = withDefaults(
  defineProps<{
    /** Section title */
    title?: string;
    titleTooltip?: string;
    /** Shows 'Required label text under the title */
    requiredLabel?: boolean;
    formInputsParams?: object;
  }>(),
  {
    title: "",
    titleTooltip: "",
    requiredLabel: false,
    bordered: false,
    fullWidth: false,
    formInputsParams: undefined,
  },
);

const { grid } = useLayout();

const formSectionClasses = computed(() => ["form-section"]);

const { t } = useI18n();
</script>
<style lang="scss">
.form-section {
  & + & {
    margin-top: 2rem;
    @include media-breakpoint-up(desktop) {
      margin-top: 3rem;
    }
  }
}

.form-section__title {
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.5rem;
  margin: 0 0 0.75rem;
}

.form-section__subtitle {
  color: $text-placeholder;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.125rem;
  margin-top: 0;
  margin-bottom: 0.75rem;

  &--required {
    margin-bottom: 1.5rem;
    &:before {
      @include requiredPseudo;
    }
  }
}
</style>
