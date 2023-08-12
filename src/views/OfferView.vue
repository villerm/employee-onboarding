<template>
  <LoadingSpinner v-if="loading" full-screen class="loading" :size="150" />
  <template v-else>
    <div class="offer">
      <OfferDetails
        v-if="offer"
        :offer="offer"
        :current-step="currentStep"
        :steps-count="stepsCount"
      />
    </div>
  </template>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { IOffer } from "@/types/jobOffer";
import { getOffer } from "@/services/offers";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import handleError from "@/utils/handleError";
import OfferDetails from "@/components/OfferDetails.vue";
import useApplicant from "@/Store/applicant";

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const offer = ref<IOffer>();
const stepsCount = ref(2);
const currentStep = ref(1);

const applicantStore = useApplicant();

// Fetch offer by unique token
const fetchOffer = async () => {
  try {
    offer.value = await getOffer(applicantStore.token);
  } catch (e) {
    const { message: errorMessage } = handleError(e);
    await router.push({ path: "/" });
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  if (!route.params.token || route.params.token.length !== 64) {
    await router.push({ path: "/" });
  }
  applicantStore.token = route.params.token as string;
  await fetchOffer();
});
</script>

<style lang="scss">
.progress {
  margin: 3rem 0;
}
</style>
