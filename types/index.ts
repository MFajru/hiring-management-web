export interface IBreadcrumb {
  text: string;
  link: string;
}

export type TCandidate = {
  id: string;
  fullName: string;
  photoProfile: string;
  email: string;
  phone: string;
  dob: string;
  domicile: string;
  gender: string;
  linkedin: string;
  jobId: string;
};

export type TProfileInfoReq = {
  name: string;
  slug: string;
  reqStatus: "mandatory" | "optional" | "off" | "";
  isMustMandatory: boolean;
};

export type TJobList = {
  id: string;
  jobName: string;
  jobType: string;
  jobDesc: string;
  numOfCandidate: number;
  minimumSalary: number;
  maximumSalary: number;
  createdDate: string;
  status: string;
  requiredInfo: TProfileInfoReq[];
};

export type TFormJob = {
  id: number;
  jobId: number;
  photoProfile: string;
  fullName: string;
  dob: string;
  gender: string;
  domicile: string;
  phone: string;
  email: string;
  linkedin: string;
};
