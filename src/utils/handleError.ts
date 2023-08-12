import axios, { AxiosError } from "axios";

const handleError = (err: AxiosError | unknown) => {
  if (axios.isAxiosError(err)) {
    if (err.response?.data) return err?.response?.data;
    return err;
  }
  return err;
};

export default handleError;
