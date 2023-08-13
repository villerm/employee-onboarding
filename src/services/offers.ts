import handleError from "@/utils/handleError";
import type { IOffer } from "@/types/jobOffer";
import api from "@/services/api";

/**
 * @params token: 64 long unique token
 * @description returns job offer
 */
export const getOffer = async (token: string): Promise<IOffer> => {
  try {
    const { data } = await api.get(`/job-offer/${token}`);
    return data;
  } catch (e) {
    return Promise.reject(handleError(e));
  }
};

/**
 * @params token: 64 long unique token
 * @description returns applicant form
 */
export const getEmployeeForm = async (token: string): Promise<any> => {
  try {
    const { data } = await api.get(`/new-employee-form/${token}`);
    return data;
  } catch (e) {
    return Promise.reject(handleError(e));
  }
};

export default getOffer;
