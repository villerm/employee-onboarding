<template>
  <div class="applicant-form">
    <div class="applicant-form__header">
      <h1 :class="{ h3: !grid.desktop }">
        {{ applicantData.pageTitle }}
      </h1>
    </div>
    <form @submit.prevent="handleSubmit" novalidate>
      <div class="applicant-form__content">
        <CardSection :title="t('labels.applicant')">
          <FormSection required-label>
            <FormInput
              :type="EFormInputType.TEXT"
              :label="t('fields.firstName')"
              :placeholder="t('placeholder.firstName')"
              name="firstName"
              v-model="formData.applicant.firstName"
              v-bind="validationAttributes('applicant.firstName')"
            />
            <FormInput
              :type="EFormInputType.TEXT"
              :label="t('fields.lastName')"
              :placeholder="t('placeholder.lastName')"
              name="lastName"
              v-model="formData.applicant.lastName"
              v-bind="validationAttributes('applicant.lastName')"
            />
            <FormInput
              :type="EFormInputType.TEXT"
              :label="t('fields.nationalIdentityNumber')"
              :placeholder="t('placeholder.nationalIdentityNumber')"
              name="nationalIdentityNumber"
              v-model="formData.applicant.nationalIdentityNumber"
              v-bind="validationAttributes('applicant.nationalIdentityNumber')"
            />
            <FormInput
              :type="EFormInputType.TEXT"
              :label="t('fields.dateOfBirth')"
              :placeholder="t('placeholder.dateOfBirth')"
              name="dateOfBirth"
              v-model="formData.applicant.dateOfBirth"
              v-bind="validationAttributes('applicant.dateOfBirth')"
            />
            <FormInput
              :type="EFormInputType.SELECT"
              :label="t('fields.gender')"
              :placeholder="t('placeholder.gender')"
              :options="genderOptions"
              value-filed="value"
              name="gender"
              v-model="formData.applicant.gender"
              v-bind="validationAttributes('applicant.gender')"
            />
          </FormSection>
        </CardSection>

        <CardSection :title="t('labels.contactDetails')">
          <FormSection required-label>
            <FormInput
              :type="EFormInputType.TEXT"
              :label="t('fields.postalAddress')"
              :placeholder="t('placeholder.postalAddress')"
              name="postalAddress"
              v-model="formData.contactDetails.postalAddress"
              v-bind="validationAttributes('contactDetails.postalAddress')"
            />
            <FormInput
              :type="EFormInputType.TEXT"
              :label="t('fields.phoneNumber')"
              :placeholder="t('placeholder.phoneNumber')"
              name="phoneNumber"
              v-model="formData.contactDetails.phoneNumber"
              v-bind="validationAttributes('contactDetails.phoneNumber')"
            />
            <FormInput
              :type="EFormInputType.TEXT"
              :label="t('fields.emailAddress')"
              :placeholder="t('placeholder.emailAddress')"
              name="emailAddress"
              v-model="formData.contactDetails.emailAddress"
              v-bind="validationAttributes('contactDetails.emailAddress')"
            />
          </FormSection>
        </CardSection>

        <CardSection :title="t('labels.bankAccount')">
          <FormSection required-label>
            <FormInput
              :type="EFormInputType.TEXT"
              :label="t('fields.recipientName')"
              :placeholder="t('placeholder.recipientName')"
              name="recipientName"
              v-model="formData.bankAccount.recipientName"
              v-bind="validationAttributes('bankAccount.recipientName')"
            />
            <FormInput
              :type="EFormInputType.TEXT"
              :label="t('fields.iban')"
              :placeholder="t('placeholder.iban')"
              name="iban"
              v-model="formData.bankAccount.iban"
              v-bind="validationAttributes('bankAccount.iban')"
            />
          </FormSection>
        </CardSection>
        <CardSection :title="t('labels.emergencyContact')">
          <FormSection required-label>
            <FormInput
              :type="EFormInputType.TEXT"
              :label="t('fields.firstName')"
              :placeholder="t('placeholder.firstName')"
              name="emergencyFirstName"
              v-model="formData.emergencyContact.firstName"
              v-bind="validationAttributes('emergencyContact.firstName')"
            />
            <FormInput
              :type="EFormInputType.TEXT"
              :label="t('fields.lastName')"
              :placeholder="t('placeholder.lastName')"
              name="emergencyLastName"
              v-model="formData.emergencyContact.lastName"
              v-bind="validationAttributes('emergencyContact.lastName')"
            />
            <FormInput
              :type="EFormInputType.SELECT"
              :label="t('fields.relationshipType')"
              :placeholder="t('placeholder.relationshipType')"
              :options="roleOptions"
              name="relationshipType"
              value-filed="value"
              v-model="formData.emergencyContact.relationshipType"
              v-bind="validationAttributes('emergencyContact.relationshipType')"
            />
            <FormInput
              :type="EFormInputType.TEXT"
              :label="t('fields.phoneNumber')"
              :placeholder="t('placeholder.phoneNumber')"
              name="emergencyPhoneNumber"
              v-model="formData.emergencyContact.phoneNumber"
              v-bind="validationAttributes('emergencyContact.phoneNumber')"
            />
            <FormInput
              :type="EFormInputType.TEXT"
              :label="t('fields.emailAddress')"
              :placeholder="t('placeholder.emailAddress')"
              name="emergencyEmailAddress"
              v-model="formData.emergencyContact.emailAddress"
              v-bind="validationAttributes('emergencyContact.emailAddress')"
            />
          </FormSection>
        </CardSection>

        <CardSection>
          <FormSection>
            <template #actions>
              <div class="form-actions">
                <action-button
                  :size="EActionButtonSize.LARGE"
                  @click="handleCancel"
                  first-icon="arrow-left"
                  :label="t('button.back')"
                  v-bind="{ fullWidth: grid.breakpoint !== 'desktop' }"
                />
                <action-button
                  submit
                  :size="EActionButtonSize.LARGE"
                  :type="EActionButtonType.PRIMARY"
                  :label="t('button.save')"
                  second-icon="checked-circle"
                  v-bind="{ fullWidth: grid.breakpoint !== 'desktop' }"
                />
              </div>
            </template>
          </FormSection>
        </CardSection>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed, onBeforeMount, reactive } from "vue";
import {
  email,
  helpers,
  minLength,
  numeric,
  required,
} from "@vuelidate/validators";
import useLayout from "@/composables/layout/layout";
import type { IApplicantForm, IApplicantFormResponse } from "@/types/applicant";
import { EGenderOption, ERelationShipType } from "@/enums/applicant.enum";
import useRouter from "@/composables/useRouter/useRouter";
import CardSection from "@/components/CardSection.vue";
import { EFormInputType } from "@/components/FormInput/FormInput.enums";
import useFormValidation from "@/composables/formValidation/formValidation";
import FormInput from "@/components/FormInput/FormInput.vue";
import FormSection from "@/components/Form/FormSection.vue";
import ActionButton from "@/components/ActionButton/ActionButton.vue";
import {
  EActionButtonSize,
  EActionButtonType,
} from "@/components/ActionButton/ActionButton.enums";
import useApplicant from "@/Store/applicant";

const router = useRouter();
const { t } = useI18n();
const { grid } = useLayout();

const props = defineProps<{
  applicantData: IApplicantFormResponse;
  token: string;
}>();

const applicantStore = useApplicant();

const genderOptions = [
  {
    label: t("gender.Male"),
    value: EGenderOption.MALE,
  },
  {
    label: t("gender.Female"),
    value: EGenderOption.FEMALE,
  },
];

const roleOptions = [
  {
    label: t("relationshipType.Child"),
    value: ERelationShipType.CHILD,
  },
  {
    label: t("relationshipType.Spouse"),
    value: ERelationShipType.SPOUSE,
  },
  {
    label: t("relationshipType.LifePartner"),
    value: ERelationShipType.LIFEPARTNER,
  },
  {
    label: t("relationshipType.Father"),
    value: ERelationShipType.FATHER,
  },
  {
    label: t("relationshipType.Mother"),
    value: ERelationShipType.MOTHER,
  },
  {
    label: t("relationshipType.Grandfather"),
    value: ERelationShipType.GRANDFATHER,
  },
  {
    label: t("relationshipType.Grandmother"),
    value: ERelationShipType.GRANDMOTHER,
  },
  {
    label: t("relationshipType.Other"),
    value: ERelationShipType.OTHER,
  },
];

const formData = reactive<IApplicantForm>({
  applicant: {
    firstName: "",
    lastName: "",
    nationalIdentityNumber: "",
    dateOfBirth: "",
    gender: undefined,
  },
  contactDetails: {
    postalAddress: "",
    phoneNumber: "",
    emailAddress: "",
  },
  bankAccount: {
    recipientName: "",
    iban: "",
  },
  emergencyContact: {
    firstName: "",
    lastName: "",
    relationshipType: undefined,
    phoneNumber: "",
    emailAddress: "",
  },
});

const formRules = computed(() => ({
  applicant: {
    firstName: {
      required: helpers.withMessage(
        t("form.errors.general.fieldRequired"),
        required,
      ),
    },
    lastName: {
      required: helpers.withMessage(
        t("form.errors.general.fieldRequired"),
        required,
      ),
    },
    nationalIdentityNumber: {
      required: helpers.withMessage(
        t("form.errors.general.fieldRequired"),
        required,
      ),
      minLength: helpers.withMessage(
        t("form.errors.idcode.minLength"),
        minLength(11),
      ),
      numeric: helpers.withMessage(t("form.errors.general.numeric"), numeric),
    },
    dateOfBirth: {
      required: helpers.withMessage(
        t("form.errors.general.fieldRequired"),
        required,
      ),
    },
    gender: {
      required: helpers.withMessage(
        t("form.errors.general.fieldRequired"),
        required,
      ),
    },
  },
  contactDetails: {
    postalAddress: {
      required: helpers.withMessage(
        t("form.errors.general.fieldRequired"),
        required,
      ),
    },
    phoneNumber: {
      required: helpers.withMessage(
        t("form.errors.general.fieldRequired"),
        required,
      ),
      numeric: helpers.withMessage(t("form.errors.general.numeric"), numeric),
    },
    emailAddress: {
      required: helpers.withMessage(
        t("form.errors.general.fieldRequired"),
        required,
      ),
      email: helpers.withMessage(t("form.errors.email.isValid"), email),
    },
  },
  bankAccount: {
    recipientName: {
      required: helpers.withMessage(
        t("form.errors.general.fieldRequired"),
        required,
      ),
    },
    iban: {
      required: helpers.withMessage(
        t("form.errors.general.fieldRequired"),
        required,
      ),
    },
  },
  emergencyContact: {
    firstName: {
      required: helpers.withMessage(
        t("form.errors.general.fieldRequired"),
        required,
      ),
    },
    lastName: {
      required: helpers.withMessage(
        t("form.errors.general.fieldRequired"),
        required,
      ),
    },
    relationshipType: {
      required: helpers.withMessage(
        t("form.errors.general.fieldRequired"),
        required,
      ),
    },
    phoneNumber: {
      required: helpers.withMessage(
        t("form.errors.general.fieldRequired"),
        required,
      ),
    },
    emailAddress: {
      required: helpers.withMessage(
        t("form.errors.general.fieldRequired"),
        required,
      ),
      email: helpers.withMessage(t("form.errors.email.isValid"), email),
    },
  },
}));

const { validate, validationAttributes } = useFormValidation(
  formRules,
  formData,
);

const handleCancel = async () => {
  await router.push({
    name: "offerPage",
    params: { token: props.token },
  });
};

const handleSubmit = async () => {
  const isValid = await validate();
  if (!isValid) {
    return;
  }
  // submit form
  console.log(formData);
  applicantStore.form = formData;
  await router.push({
    name: "thanksPage",
  });
};

onBeforeMount(() => {
  Object.assign(formData, props.applicantData);
});
</script>
<style lang="scss">
.applicant-form {
  &__header {
    position: relative;
    padding: 4rem 0 2rem;
    color: $white;
    color: $white;
    max-width: 780px;
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  @include media-breakpoint-down(tablet) {
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
