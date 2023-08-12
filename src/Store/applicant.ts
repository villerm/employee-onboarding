import { defineStore } from "pinia";
import type { IApplicantForm } from "@/types/applicant";

const useApplicant = defineStore("applicant", {
  state: () => ({
    token: "",
    termsAgreed: false,
    form: {} as IApplicantForm,
  }),
});

export default useApplicant;
