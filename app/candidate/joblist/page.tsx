"use client";

import NoJob from "@/components/customUI/no-job";
import Topbar from "@/components/customUI/topbar";
import { Button } from "@/components/ui/button";
import { TopbarProvider } from "@/context/topbarContext";
import { useFetch } from "@/hooks/useFetch";
import formatToIdr from "@/lib/formatToIdr";
import { TJobList } from "@/types";
import { Banknote, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const CandidateJoblist = () => {
  const { data: jobList, fetchData: getJobList } = useFetch<TJobList[]>();
  const [clickedJobIdx, setClickedJobIdx] = useState<number | null>(null);

  useEffect(() => {
    getJobList("http://localhost:3001/jobPosting", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <TopbarProvider>
      <div className="h-screen lg:overflow-hidden w-full">
        <Topbar />
        <div className="flex flex-col items-center w-full ">
          {!jobList ? (
            <p>Fetch Error</p>
          ) : jobList.length === 0 ? (
            <NoJob
              headerText="No job openings available"
              bodyText="Please wait for the next batch of openings."
            ></NoJob>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6 justify-center px-[104px] py-10 w-full h-screen">
              <div className="w-full lg:w-[30%] overflow-auto h-full flex lg:flex-col gap-4 lg:pb-16">
                {(jobList as TJobList[]).map((job, idx) => (
                  <div
                    key={job.id}
                    className={`flex flex-col w-full border-2 rounded-xl px-4 py-3 cursor-pointer hover:border-[#01777F] hover:bg-[#F7FEFF] ${
                      clickedJobIdx === idx
                        ? "border-[#01777F] bg-[#F7FEFF]"
                        : ""
                    }`}
                    onClick={() => setClickedJobIdx(idx)}
                  >
                    <div className="flex items-center gap-4 border-b border-dashed border-gray-300 pb-2">
                      <Image
                        src={"/joblistLogo.png"}
                        alt="joblist logo"
                        width={48}
                        height={48}
                      />

                      <div className="flex flex-col">
                        <h4 className="font-bold">{job.jobName}</h4>
                        <p className="text-sm text-gray-600">Rakamin</p>
                      </div>
                    </div>
                    <div className="flex flex-col pt-2 gap-2">
                      <div className="flex items-center gap-1">
                        <MapPin width={16} height={16} color="#616161" />
                        <p className="text-sm text-gray-600">Jakarta Selatan</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Banknote width={16} height={16} color="#616161" />
                        <p className="text-gray-600 text-sm">
                          {formatToIdr(job.minimumSalary)} -{" "}
                          {formatToIdr(job.maximumSalary)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full lg:w-[70%] h-full overflow-auto pb-16">
                {clickedJobIdx === null ? (
                  <div></div>
                ) : (
                  <div className="w-full border border-[#E0E0E0] rounded-xl p-6">
                    <div className="flex flex-col gap-6">
                      <div className="flex gap-6 border-b border-gray-300 pb-6">
                        <div className="w-12">
                          <Image
                            src={"/joblistLogo.png"}
                            height={48}
                            width={48}
                            alt="job logo"
                          />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                          <div className="px-2 py-1 bg-[#43936C] rounded-sm text-xs text-white font-bold text-center w-fit capitalize">
                            {(jobList[clickedJobIdx] as TJobList).jobType}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg capitalize">
                              {(jobList[clickedJobIdx] as TJobList).jobName}
                            </h4>
                            <p className="text-sm text-gray-400">Rakamin</p>
                          </div>
                        </div>
                        <div>
                          <Button className="bg-[#FBC037] px-4 py-1 text-black hover:bg-[#fdb100]">
                            Apply
                          </Button>
                        </div>
                      </div>
                      <div className="px-6">
                        <p className="text-sm text-[#404040]">
                          {(jobList[clickedJobIdx] as TJobList).jobDesc}
                        </p>

                        {/* <ul className="list-disc text-sm text-[#404040]">
                          <li>
                            Develop, test, and maintain responsive,
                            high-performance web applications using modern
                            front-end technologies.
                          </li>
                          <li>
                            Collaborate with UI/UX designers to translate
                            wireframes and prototypes into functional code.
                          </li>
                          <li>
                            Integrate front-end components with APIs and backend
                            services. Ensure cross-browser compatibility and
                            optimize applications for maximum speed and
                            scalability.
                          </li>
                          <li>
                            Write clean, reusable, and maintainable code
                            following best practices and coding standards.
                          </li>
                          <li>
                            Participate in code reviews, contributing to
                            continuous improvement and knowledge sharing.
                          </li>
                        </ul> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </TopbarProvider>
  );
};

export default CandidateJoblist;
