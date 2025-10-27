"use client";
import Topbar from "@/components/customUI/topbar";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import NoJob from "./_components/no-job";
import { useState } from "react";
import CardJob from "./_components/card-job";

const AdminHome = () => {
  const [jobList, setJobList] = useState<string[]>(["test"]);
  return (
    <div className="w-screen h-screen">
      <Topbar></Topbar>
      <div className="flex px-5 gap-6 mt-9 w-full h-screen">
        <div className="w-3/4 h-full">
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
        <div className="w-1/4">
          <div className="bg-[url(/whiteboard.jpg)] bg-cover rounded-2xl relative">
            <div className="bg-black opacity-70 absolute z-0 w-full h-full rounded-2xl"></div>
            <div className="p-6 flex flex-col gap-6 relative z-10 font-bold ">
              <div className="text-white flex flex-col gap-1">
                <h4 className="text-lg">Recruit the best candidates</h4>
                <p className="text-sm">
                  Create jobs, invite, and hire with ease
                </p>
              </div>
              <Button id="createJob" name="createJob">
                Create a new job
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
