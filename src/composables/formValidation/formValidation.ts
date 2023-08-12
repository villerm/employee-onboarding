import type { GlobalConfig, ValidationArgs } from "@vuelidate/core";
import type { Ref, ToRefs } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { EFormInputStatus } from "@/components/FormInput/FormInput.enums";
import recompose from "@/utils/objects";

type validationAttributes = {
  status: EFormInputStatus | undefined;
  required?: boolean;
  helperText?: string;
};

function useFormValidation<
  // eslint-disable-next-line no-use-before-define
  T extends { [key in keyof Vargs]: any },
  Vargs extends ValidationArgs = ValidationArgs,
>(
  validationsArgs: Ref<Vargs> | Vargs,
  state: T | Ref<T> | ToRefs<T>,
  globalConfig?: GlobalConfig,
) {
  const validation = useVuelidate(validationsArgs, state, globalConfig);
  return {
    v$: validation,
    validationAttributes: (name: string) => {
      if (!recompose(validation.value, name)) {
        return {};
      }
      const attributes: validationAttributes = {
        status: recompose(validation.value, name).$error
          ? EFormInputStatus.ERROR
          : undefined,
        required: !!recompose(validation.value, name).required,
      };
      if (recompose(validation.value, name).$errors[0]?.$message) {
        attributes.helperText = recompose(validation.value, name).$errors[0]
          ?.$message;
      }
      return attributes;
    },
    validate: validation.value.$validate, // Promise
    clearFormErrors: validation.value.$reset,
  };
}
export default useFormValidation;
