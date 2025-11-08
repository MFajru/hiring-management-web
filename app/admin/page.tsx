"use client";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import NoJob from "../../components/customUI/no-job";
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
import { startCreateJobValue, startErrorMsg } from "./_const/const";
import { regexDecimalOnly } from "@/lib/regex";
import { titleCase } from "@/lib/titleCase";
import { DialogDescription } from "@radix-ui/react-dialog";
import { TJobList } from "@/types";

export type TErrorMsg = {
  jobName: string;
  jobType: string;
  jobDesc: string;
  numOfCandidate: string;
  minimumSalary: string;
  maximumSalary: string;
  gender: string;
  domicile: string;
  phoneNumber: string;
  linkedinLink: string;
  dob: string;
};

const AdminHome = () => {
  let countErr = 0;
  const route = useRouter();
  const { data: jobList, fetchData: getJobs } = useFetch<Partial<TJobList[]>>();
  const {
    data: postData,
    fetchData: postJobs,
    error: errorPostResponse,
  } = useFetch<Partial<TJobList>>();

  const { setType, setTitle } = useTopbar();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [createJobData, setCreateJobData] =
    useState<Partial<TJobList>>(startCreateJobValue);
  const [errorMsg, setErrorMsg] = useState<TErrorMsg>(startErrorMsg);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement> | string | ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (typeof e === "string") {
      setCreateJobData((prevValue) => ({
        ...prevValue,
        jobType: e,
      }));

      setErrorMsg((prevValue) => ({
        ...prevValue,
        jobType: "",
      }));
      return;
    }

    const key = e.target.name;
    let value: string | number = e.target.value;

    setErrorMsg((prevValue) => ({
      ...prevValue,
      [key]: "",
    }));

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
      regexDecimalOnly.test(value.replace(/\./g, ""))
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

    const isError = isErrorInput();
    if (!isError) {
      postJobs("http://localhost:3001/jobPosting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createJobData),
      });
    }
  };

  useEffect(() => {
    if (errorPostResponse === null) {
      return;
    } else if (errorPostResponse === ("no error" as unknown as Error)) {
      setIsDialogOpen(false);
      getJobList();
      setCreateJobData(startCreateJobValue);
      setErrorMsg(startErrorMsg);
      toast.success("Success add data");
    } else {
      toast.error("Error posting data, " + errorPostResponse);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorPostResponse, postData]);

  useEffect(() => {
    setType("title");
    setTitle("Job List");
  }, [setTitle, setType]);

  useEffect(() => {
    getJobList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isErrorInput = (): boolean => {
    if (createJobData && createJobData.requiredInfo) {
      const jobDataKeys = Object.keys(createJobData);
      const errorKeys = Object.keys(errorMsg);

      for (const key of jobDataKeys) {
        if (
          (createJobData[key as keyof TJobList] === "" ||
            createJobData[key as keyof TJobList] === 0) &&
          errorKeys.includes(key)
        ) {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            [key]: `${titleCase(key)} must be filled`,
          }));
          countErr += 1;
        }
      }

      for (const req of createJobData.requiredInfo) {
        if (req.reqStatus === "" && errorKeys.includes(req.slug)) {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            [req.slug]: `${titleCase(req.slug)} must be filled`,
          }));
          countErr += 1;
        }
      }

      if (countErr > 0) {
        return true;
      }
      return false;
    }
    return true;
  };

  useEffect(() => {
    setErrorMsg(startErrorMsg);
  }, [isDialogOpen]);

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
              <NoJob
                headerText="No job openings available"
                bodyText="Create a job opening now and start the candidate process."
              >
                <Button
                  variant={"secondary"}
                  id="createJob"
                  name="createJob"
                  className="text-black"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Create new job
                </Button>
              </NoJob>
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
              <DialogContent className="sm:max-w-1/2">
                <DialogDescription className="sr-only">
                  Create job dialog
                </DialogDescription>
                <DialogHeader>
                  <DialogTitle>Job Opening</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleOnSubmit}>
                  <div className="max-h-[350px] lg:max-h-[500px] overflow-auto scrollbar-hidden flex flex-col gap-4">
                    <CreateJobDialog
                      jobData={createJobData}
                      errorMsg={errorMsg}
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
