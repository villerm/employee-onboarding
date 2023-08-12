import type { EGenderOption } from "@/enums/applicant.enum";

export interface IApplicant {
  firstName: string;
  lastName: string;
  nationalIdentityNumber: string;
  dateOfBirth: string;
  gender: EGenderOption | undefined;
}

export interface IContactDetails {
  postalAddress: string;
  phoneNumber: string;
  emailAddress: string;
}

export interface IBankAccount {
  recipientName: string;
  iban: string;
}

export interface IEmergencyContact {
  firstName: string;
  lastName: string;
  relationshipType: string | undefined;
  phoneNumber: string;
  emailAddress: string;
}

export interface IApplicantForm {
  applicant: IApplicant;
  contactDetails: IContactDetails;
  bankAccount: IBankAccount;
  emergencyContact: IEmergencyContact;
}

export interface IApplicantFormResponse {
  token: string;
  pageTitle: string;
  applicant: {
    firstName: string;
    lastName: string;
  };
  contactDetails: {
    emailAddress: string;
  };
  bankAccount: {
    recipientName: string;
  };
}
