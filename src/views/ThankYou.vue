<template>
  <div class="thankyou">
    <h1>{{ t("general.thankyou") }}</h1>
    <h4>{{ t("general.formSubmitted") }}</h4>
  </div>
  <div class="data">
    <CardSection :title="t('labels.applicant')">
      <template v-for="(field, index) in userFormData.applicant" :key="index">
        <SingleDetail
          v-if="field"
          :label="t(`fields.${index}`)"
          :value="field"
        />
      </template>
    </CardSection>
    <CardSection :title="t('labels.contactDetails')">
      <template
        v-for="(field, index) in userFormData.contactDetails"
        :key="index"
      >
        <SingleDetail
          v-if="field"
          :label="t(`fields.${index}`)"
          :value="field"
        />
      </template>
    </CardSection>

    <CardSection :title="t('labels.bankAccount')">
      <template v-for="(field, index) in userFormData.bankAccount" :key="index">
        <SingleDetail
          v-if="field"
          :label="t(`fields.${index}`)"
          :value="field"
        />
      </template>
    </CardSection>

    <CardSection :title="t('labels.emergencyContact')">
      <template
        v-for="(field, index) in userFormData.emergencyContact"
        :key="index"
      >
        <SingleDetail
          v-if="field"
          :label="t(`fields.${index}`)"
          :value="field"
        />
      </template>
    </CardSection>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import useApplicant from "@/Store/applicant";
import CardSection from "@/components/CardSection.vue";
import SingleDetail from "@/components/SingleDetail.vue";

const applicantStore = useApplicant();

const userFormData = applicantStore.form;
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.thankyou {
  color: $white;
  text-align: center;
  padding: 5rem 0;
}
.data {
  margin: 2rem auto;
  max-width: $container-lg;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 5rem;
}
</style>
