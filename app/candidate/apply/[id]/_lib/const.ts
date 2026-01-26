import { TPhoneCountryCodes } from "./type";

export const FORMDATA_INIT = {
  photoProfile: "",
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  domicile: "",
  gender: "",
  linkedin: "",
  jobId: "",
};

export const PHOTOURL_INIT = {
  url: "",
  isSubmited: false,
};

export const phoneCountryCodes: TPhoneCountryCodes[] = [
  {
    name: "ID",
    code: "62",
  },
  {
    name: "US",
    code: "1",
  },
  {
    name: "UK",
    code: "44",
  },
  {
    name: "MY",
    code: "60",
  },
  {
    name: "SAU",
    code: "966",
  },
];

export const AGE_LIMIT_MS = 536482800000;
