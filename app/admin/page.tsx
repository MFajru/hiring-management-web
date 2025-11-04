"use client";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import NoJob from "./_components/no-job";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import CardJob from "./_components/card-job";
import { useTopbar } from "@/context/topbarContext";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateJobDialog from "./_components/create-job-dialog";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import moment from "moment";
import { toast } from "sonner";

export type TProfileInfoReq = {
  name: string;
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

const startCreateJobValue: Partial<TJobList> = {
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
      reqStatus: "mandatory",
      isMustMandatory: true,
    },
    {
      name: "Photo Profile",
      reqStatus: "mandatory",
      isMustMandatory: true,
    },
    {
      name: "Gender",
      reqStatus: "",
      isMustMandatory: false,
    },
    {
      name: "Domicile",
      reqStatus: "",
      isMustMandatory: false,
    },
    {
      name: "Email",
      reqStatus: "mandatory",
      isMustMandatory: true,
    },
    {
      name: "Phone Number",
      reqStatus: "",
      isMustMandatory: false,
    },
    {
      name: "Linkedin Link",
      reqStatus: "",
      isMustMandatory: false,
    },
    {
      name: "Date of Birth",
      reqStatus: "",
      isMustMandatory: false,
    },
  ],
};

const regex = /^\d+$/;

const AdminHome = () => {
  const route = useRouter();
  const { data: jobList, fetchData: getJobs } = useFetch<Partial<TJobList[]>>();
  const {
    fetchData: postJobs,
    error: errorPostResponse,
    errorMsg,
  } = useFetch<Partial<TJobList>>();

  const { setType, setTitle } = useTopbar();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [createJobData, setCreateJobData] =
    useState<Partial<TJobList>>(startCreateJobValue);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement> | string | ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (typeof e === "string") {
      setCreateJobData((prevValue) => ({
        ...prevValue,
        jobType: e,
      }));
      return;
    }

    const key = e.target.name;
    let value: string | number = e.target.value;

    if (
      (key === "minimumSalary" ||
        key === "maximumSalary" ||
        key === "numOfCandidate") &&
      value.length > 15
    ) {
      return;
    }

    if (
      (key === "minimumSalary" ||
        key === "maximumSalary" ||
        key === "numOfCandidate") &&
      value &&
      regex.test(value.replace(/\./g, ""))
    ) {
      value = parseInt(value.replace(/\./g, ""));
    } else if (
      key === "minimumSalary" ||
      key === "maximumSalary" ||
      key === "numOfCandidate"
    ) {
      value = parseInt("0");
    }

    const date = moment().format();
    setCreateJobData((prevValue) => ({
      ...prevValue,
      createdDate: date.toString(),
      status: "active",
      [key]: value,
    }));
  };

  const handleButtonProfile = (
    param: "mandatory" | "optional" | "off",
    idx: number
  ) => {
    if (createJobData.requiredInfo) {
      const cp = [...createJobData.requiredInfo];
      cp[idx] = { ...cp[idx], reqStatus: param };
      setCreateJobData((prevValue) => ({
        ...prevValue,
        requiredInfo: cp,
      }));
    }
  };

  const getJobList = () => {
    getJobs("http://localhost:3001/jobPosting", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postJobs("http://localhost:3001/jobPosting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createJobData),
    });
  };

  useEffect(() => {
    if (errorPostResponse === null) {
      return;
    } else if (errorPostResponse === ("no error" as unknown as Error)) {
      setIsDialogOpen(false);
      getJobList();
      setCreateJobData(startCreateJobValue);
      toast.success("Success add data");
    } else {
      toast.error("Error posting data, " + errorPostResponse);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorPostResponse]);

  useEffect(() => {
    setType("title");
    setTitle("Job List");
  }, [setTitle, setType]);

  useEffect(() => {
    getJobList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full sm:w-3/4">
        <InputGroup className="w-full">
          <InputGroupInput
            id="searchJob"
            name="searchJob"
            placeholder="Search by job details"
          />
          <InputGroupAddon align="inline-end">
            <Search color="#01959F" />
          </InputGroupAddon>
        </InputGroup>
        {jobList ? (
          <div className="flex flex-col items-center gap-4 w-full py-4">
            {(jobList as TJobList[]).length === 0 ? (
              <NoJob />
            ) : (
              (jobList as TJobList[]).map((job) => (
                <React.Fragment key={job.id}>
                  <CardJob
                    jobName={job.jobName}
                    status={job.status}
                    minSalary={job.minimumSalary}
                    maxSalary={job.maximumSalary}
                    createdDate={job.createdDate}
                    handleManageJob={() =>
                      route.push(
                        `/admin/manage-job/${job.id}?title=${job.jobName}`
                      )
                    }
                  />
                </React.Fragment>
              ))
            )}
          </div>
        ) : (
          <p>Fetch error</p>
        )}
      </div>
      <div className="w-full sm:w-1/4">
        <div className="bg-[url(/whiteboard.jpg)] bg-cover rounded-2xl relative">
          <div className="bg-black opacity-70 absolute z-0 w-full h-full rounded-2xl"></div>
          <div className="p-6 flex flex-col relative z-10 font-bold ">
            <div className="text-white flex flex-col gap-1">
              <h4 className="text-lg">Recruit the best candidates</h4>
              <p className="text-sm">Create jobs, invite, and hire with ease</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button id="createJob" name="createJob" className="mt-6">
                  Create a new job
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-1/2"
                aria-describedby="create job dialog"
              >
                <DialogHeader>
                  <DialogTitle>Job Opening</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleOnSubmit}>
                  <div className="max-h-[350px] lg:max-h-[500px] overflow-auto scrollbar-hidden flex flex-col gap-4">
                    <CreateJobDialog
                      jobData={createJobData}
                      handleOnChange={handleOnChange}
                      handleButtonProfile={handleButtonProfile}
                    />
                  </div>
                  <DialogFooter>
                    <div className="w-full flex justify-end mt-2">
                      <Button type="submit">Publish Job</Button>
                    </div>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
