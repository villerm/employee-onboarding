import type { EContractType } from "@/enums/contract.enum";
import type { ECurrency } from "@/enums/currency.enum";
import type { ERemuneration } from "@/enums/remuneration.enum";

export interface IContract {
  contractType: EContractType;
  positionName: string;
  structureTreeFullPath: string;
  startDate: string;
  endDate?: string;
  fteWorkload: number;
  remunerationType: ERemuneration;
  remunerationGrossAmount: number;
  remunerationCurrency: ECurrency;
  probationaryPeriodStartDate: string;
  probationaryPeriodEndDate: string;
  benefits: string[];
}
