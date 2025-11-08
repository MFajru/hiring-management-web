export interface IBreadcrumb {
  text: string;
  link: string;
}

export type TCandidate = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  domicile: string;
  gender: string;
  linkedin: string;
  jobId: number;
};

export type TProfileInfoReq = {
  name: string;
  slug: string;
  reqStatus: "mandatory" | "optional" | "off" | "";
  isMustMandatory: boolean;
};

export type TJobList = {
  id: number;
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
