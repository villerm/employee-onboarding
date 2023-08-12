import type { IContract } from "./contract";

export interface IOffer {
  token: string;
  pageTitle: string;
  businessName: string;
  applicant: { firstName: string; lastName: string };
  welcomeText: string;
  contract: IContract;
}
