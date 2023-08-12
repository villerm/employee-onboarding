export interface TFormSelectOption {
  [key: string]: unknown;
  label: string;
  id?: number;
  disabled?: boolean | undefined;
  tooltip?: string;
}

export type TTelInputPrefix = {
  name: string;
  dial_code: string;
  code: string;
};

export type TTelInputValue = {
  phone: string;
  phonePrefix: string;
};
