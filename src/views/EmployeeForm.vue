<template>
  <LoadingSpinner v-if="loading" full-screen class="loading" :size="150" />
  <template v-else>
    <div class="offer">
      <ApplicantForm
        v-if="applicantFormData"
        :applicant-data="applicantFormData"
        :token="applicantStore.token"
      />
    </div>
  </template>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

import { useRouter } from "vue-router";
import { getEmployeeForm } from "@/services/offers";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ApplicantForm from "@/components/ApplicantForm.vue";
import useApplicant from "@/Store/applicant";
import type { IApplicantFormResponse } from "@/types/applicant";

const router = useRouter();

const loading = ref(true);

const applicantStore = useApplicant();
const applicantFormData = ref<IApplicantFormResponse>();

// Fetch  applicant formData
const fetchApplicantForm = async () => {
  try {
    applicantFormData.value = await getEmployeeForm(applicantStore.token);
  } catch (e) {
    await router.push({ path: "/" });
  } finally {
    loading.value = false;
  }
};

onBeforeMount(async () => {
  if (!applicantStore.token || !applicantStore.termsAgreed) {
    await router.push({ path: "/" });
  }
  await fetchApplicantForm();
});
</script>

<style lang="scss" scoped>
.offer {
  max-width: $container-lg;
  margin: 0 auto 4rem;
  padding: 0 1rem;
}
.progress {
  margin: 3rem 0;
}

.loading {
  margin: 0 auto;
}
</style>
