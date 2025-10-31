"use client";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import NoJob from "./_components/no-job";
import { useEffect, useState } from "react";
import CardJob from "./_components/card-job";
import { useTopbar } from "@/context/topbarContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateJobDialog from "./_components/create-job-dialog";

const AdminHome = () => {
  const [jobList, setJobList] = useState<string[]>(["test"]);
  const { setType, setTitle } = useTopbar();

  useEffect(() => {
    setType("title");
    setTitle("Job List");
  }, [setTitle, setType]);
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
        <div className="flex flex-col items-center gap-4 w-full py-4">
          {jobList.length === 0 ? (
            <NoJob />
          ) : (
            jobList.map((item) => <CardJob key={item}></CardJob>)
          )}
        </div>
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
