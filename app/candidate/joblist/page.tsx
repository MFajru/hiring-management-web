import Topbar from "@/components/customUI/topbar";
import { Button } from "@/components/ui/button";
import { TopbarProvider } from "@/context/topbarContext";
import { Banknote, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

const CandidateJoblist = () => {
  return (
    <TopbarProvider>
      <div>
        <Topbar />
        <div className="flex gap-6 justify-center px-[104px] py-10 w-screen">
          <div className="w-[30%] overflow-auto">
            <div className="flex flex-col w-full border-2 border-[#01777F] rounded-xl px-4 py-3">
              <div className="flex items-center gap-4 border-b border-dashed border-gray-300 pb-2">
                <Image
                  src={"/joblistLogo.png"}
                  alt="joblist logo"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col">
                  <h4 className="font-bold">UX Designer</h4>
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
                    Rp 7.000.000 - Rp 8.000.000
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[70%] border border-[#E0E0E0] rounded-xl p-6">
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
                  <div className="px-2 py-1 bg-[#43936C] rounded-sm text-xs text-white font-bold text-center w-fit">
                    Full-Time
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">UX Designer</h4>
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
                <ul className="list-disc text-sm text-[#404040]">
                  <li>
                    Develop, test, and maintain responsive, high-performance web
                    applications using modern front-end technologies.
                  </li>
                  <li>
                    Collaborate with UI/UX designers to translate wireframes and
                    prototypes into functional code.
                  </li>
                  <li>
                    Integrate front-end components with APIs and backend
                    services. Ensure cross-browser compatibility and optimize
                    applications for maximum speed and scalability.
                  </li>
                  <li>
                    Write clean, reusable, and maintainable code following best
                    practices and coding standards.
                  </li>
                  <li>
                    Participate in code reviews, contributing to continuous
                    improvement and knowledge sharing.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TopbarProvider>
  );
};

export default CandidateJoblist;
