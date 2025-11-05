import { TJobList } from "../page";

export const startCreateJobValue: Partial<TJobList> = {
  jobName: "",
  jobType: "",
  jobDesc: "",
  numOfCandidate: 0,
  minimumSalary: 0,
  maximumSalary: 0,
  createdDate: "",
  status: "",
  requiredInfo: [
    {
      name: "Full Name",
      slug: "fullName",
      reqStatus: "mandatory",
      isMustMandatory: true,
    },
    {
      name: "Photo Profile",
      slug: "photoProfile",
      reqStatus: "mandatory",
      isMustMandatory: true,
    },
    {
      name: "Gender",
      slug: "gender",
      reqStatus: "",
      isMustMandatory: false,
    },
    {
      name: "Domicile",
      slug: "domicile",
      reqStatus: "",
      isMustMandatory: false,
    },
    {
      name: "Email",
      slug: "email",
      reqStatus: "mandatory",
      isMustMandatory: true,
    },
    {
      name: "Phone Number",
      slug: "phoneNumber",
      reqStatus: "",
      isMustMandatory: false,
    },
    {
      name: "Linkedin Link",
      slug: "linkedinLink",
      reqStatus: "",
      isMustMandatory: false,
    },
    {
      name: "Date of Birth",
      slug: "dob",
      reqStatus: "",
      isMustMandatory: false,
    },
  ],
};

export const startErrorMsg = {
  jobName: "",
  jobType: "",
  jobDesc: "",
  numOfCandidate: "",
  minimumSalary: "",
  maximumSalary: "",
  gender: "",
  domicile: "",
  phoneNumber: "",
  linkedinLink: "",
  dob: "",
};
