"use client";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import NoJob from "./_components/no-job";
import React, { useEffect } from "react";
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

type TJobList = {
  id: number;
  jobName: string;
  status: string;
  minimumSalary: number;
  maximumSalary: number;
  createdDate: string;
};

const AdminHome = () => {
  const route = useRouter();
  const { data: jobList, fetchData: getJobs } = useFetch<TJobList[]>();
  const { setType, setTitle } = useTopbar();

  useEffect(() => {
    setType("title");
    setTitle("Job List");
  }, [setTitle, setType]);

  useEffect(() => {
    getJobs("http://localhost:3001/jobPosting", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
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
            {jobList.length === 0 ? (
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
                      route.push(`/admin/manage-job/${job.id}`)
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
            <Dialog>
              <DialogTrigger asChild>
                <Button id="createJob" name="createJob" className="mt-6">
                  Create a new job
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-1/2">
                <DialogHeader>
                  <DialogTitle>Job Opening</DialogTitle>
                </DialogHeader>
                <div className="max-h-[350px] lg:max-h-[500px] overflow-auto scrollbar-hidden">
                  <CreateJobDialog />
                </div>
                <DialogFooter>
                  <div className="w-full flex justify-end mt-2">
                    <Button type="submit">Publish Job</Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
