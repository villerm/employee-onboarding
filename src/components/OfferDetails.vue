<template>
  <div class="offer-details">
    <div class="offer-header">
      <h1 :class="{ h3: !grid.desktop }">
        {{ offer.pageTitle }}
      </h1>
      <p v-html="entryText" class="offer-header__entry-text"></p>
    </div>
    <div class="offer-details__content">
      <CardSection :title="t(`contractType.${offer.contract.contractType}`)">
        <template v-for="(field, index) in contractFields" :key="index">
          <SingleDetail
            v-if="field.value"
            :label="field.label"
            :value="field.value"
          />
        </template>
      </CardSection>

      <CardSection :title="t('labels.remuneration')">
        <template v-for="(field, index) in remunerationFields" :key="index">
          <SingleDetail
            v-if="field.value"
            :label="field.label"
            :value="field.value"
          />
        </template>
      </CardSection>

      <CardSection :title="t('labels.probation')">
        <template v-for="(field, index) in probationaFields" :key="index">
          <SingleDetail
            v-if="field.value"
            :label="field.label"
            :value="field.value"
          />
        </template>
      </CardSection>

      <CardSection :title="t('labels.benefits')">
        <ul class="benefits">
          <li class="benefits__item" v-for="field in benefitsData" :key="field">
            <span class="icon"><SvgIcon name="check" class="icon" /></span>
            <span>{{ field }}</span>
          </li>
        </ul>
      </CardSection>

      <CardSection>
        <div class="offer-agreement">
          <div class="offer-agreement__fieldgroup">
            <FormInput
              :label="t('terms.readAccept')"
              :type="EFormInputType.CHECKBOX"
              name="terms"
              v-model="applicantStore.termsAgreed"
              required
            >
              <template #label>
                <span v-html="t('terms.readAccept')"></span>
              </template>
            </FormInput>
          </div>
          <ActionButton
            class="offer-agreement__button"
            :label="t('button.confirmOffer')"
            :type="EActionButtonType.PRIMARY"
            :size="EActionButtonSize.LARGE"
            @click="handleConfirm()"
            v-bind="{ disabled: !applicantStore.termsAgreed }"
          />
        </div>
      </CardSection>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import type { IOffer } from "@/types/jobOffer";
import useLayout from "@/composables/layout/layout";
import getFormattedDate from "@/utils/date";
import SingleDetail from "@/components/SingleDetail.vue";
import CardSection from "@/components/CardSection.vue";
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";
import ActionButton from "@/components/ActionButton/ActionButton.vue";
import {
  EActionButtonType,
  EActionButtonSize,
} from "@/components/ActionButton/ActionButton.enums";
import FormInput from "@/components/FormInput/FormInput.vue";
import { EFormInputType } from "@/components/FormInput/FormInput.enums";
import useApplicant from "@/Store/applicant";

const router = useRouter();
const { t } = useI18n();
const { grid } = useLayout();
const props = defineProps<{
  offer: IOffer;
}>();
const applicantStore = useApplicant();

const contractData = computed(() => props.offer.contract);
const benefitsData = computed(() => props.offer.contract.benefits);

const contractFields = computed(() => [
  {
    label: t("fields.contractType"),
    value: t(`contractType.${contractData.value.contractType}`),
  },
  {
    label: t("fields.positionName"),
    value: contractData.value.positionName,
  },
  {
    label: t("fields.structureTreeFullPath"),
    value: contractData.value.structureTreeFullPath,
  },
  {
    label: t("fields.startDate"),
    value: getFormattedDate(contractData.value.startDate),
  },
  {
    label: t("fields.endDate"),
    value: contractData.value.endDate
      ? getFormattedDate(contractData.value.endDate)
      : undefined,
  },
  {
    label: t("fields.fteWorkload"),
    value: contractData.value.fteWorkload,
  },
]);

const remunerationFields = computed(() => [
  {
    label: t("fields.remunerationType"),
    value: t(`remunerationType.${contractData.value.remunerationType}`),
  },
  {
    label: t("fields.remunerationGrossAmount"),
    value: `${contractData.value.remunerationGrossAmount} ${t(
      `salaryCurrency.${contractData.value.remunerationCurrency}`,
    )}`,
  },
]);

const probationaFields = computed(() => [
  {
    label: t("fields.probationaryPeriodStartDate"),
    value: getFormattedDate(contractData.value.probationaryPeriodStartDate),
  },
  {
    label: t("fields.probationaryPeriodEndDate"),
    value: getFormattedDate(contractData.value.probationaryPeriodEndDate),
  },
]);

const boldString = (str: string, substr: string) => {
  const strRegExp = new RegExp(substr, "g");
  return str.replace(strRegExp, `<strong>${substr}</strong>`);
};

const entryText = computed(() =>
  boldString(props.offer.welcomeText, props.offer.businessName),
);

const handleConfirm = async () => {
  await router.push({
    name: "employeeForm",
    params: { token: props.offer.token },
  });
};
</script>
<style lang="scss">
.offer-details {
  max-width: $container-lg;
  margin: 0 auto;
  padding: 0 1rem;
  &__content {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    margin-bottom: 5rem;
  }
}

.offer-header {
  position: relative;
  padding: 4rem 0 2rem;
  color: $white;
  strong {
    font-weight: 700;
  }
  &__entry-text {
    max-width: 780px;
    font-size: 1.25rem;
    line-height: normal;
  }
  @include media-breakpoint-down(tablet) {
    padding: 0 0 2rem;
  }
}

.benefits {
  padding: 0 0 0 0rem;
  list-style-type: none;
  &__item {
    display: flex;
    font-size: 1.25rem;
    padding: 0.5rem 0;
    .icon {
      margin-right: 0.5rem;
      color: $brand-primary;
      font-size: 1.5rem;
      & > path {
        stroke-width: 3;
      }
    }
    @include media-breakpoint-down(tablet) {
      font-size: 1.125rem;
    }
  }
}

.offer-agreement {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__fieldgroup {
    display: flex;
    gap: 1rem;
  }
  @include media-breakpoint-down(desktop) {
    gap: 2rem;
    flex-direction: column;
    align-items: flex-start;
    &__button {
      margin-left: auto;
    }
  }
}
</style>
