"use client";

import InputLabel from "@/components/customUI/input-with-label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type TProfileInfoReq = {
  name: string;
  reqStatus: "mandatory" | "optional" | "off";
  isMustMandatory: boolean;
};

const CreateJobDialog = () => {
  const [profileInfoReq, setProfileInfoReq] = useState<TProfileInfoReq[]>([
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
      reqStatus: "mandatory",
      isMustMandatory: false,
    },
    {
      name: "Domicile",
      reqStatus: "mandatory",
      isMustMandatory: false,
    },
    {
      name: "Email",
      reqStatus: "mandatory",
      isMustMandatory: true,
    },
    {
      name: "Phone Number",
      reqStatus: "mandatory",
      isMustMandatory: false,
    },
    {
      name: "Linkedin Link",
      reqStatus: "mandatory",
      isMustMandatory: false,
    },
    {
      name: "Date of Birth",
      reqStatus: "mandatory",
      isMustMandatory: false,
    },
  ]);

  const handleButtonProfile = (
    param: "mandatory" | "optional" | "off",
    idx: number
  ) => {
    const cp = [...profileInfoReq];
    cp[idx] = { ...cp[idx], reqStatus: param };
    setProfileInfoReq(cp);
  };

  return (
    <form action="" className="flex flex-col gap-4">
      <InputLabel
        inputId="jobName"
        inputType="text"
        label="Job Name"
        placeholder="Ex. Front End Engineer"
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor="jobType" className="text-xs font-normal">
          Job Type
        </Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select job type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="fulltime">Full-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="parttime">Part-time</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="jobdesc" className="text-xs font-normal">
          Job Description
        </Label>
        <Textarea
          placeholder="Ex. Successfully gaining more customers"
          id="jobdesc"
          name="jobdesc"
        />
      </div>

      <InputLabel
        inputId="numOfCandidate"
        inputType="text"
        label="Number of Candidate Needed"
        placeholder="Ex. 2"
      />

      <div className="w-full flex flex-col gap-4">
        <h5 className="text-xs">Job Salary</h5>
        <div className="flex items-center justify-between w-full gap-4">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="" className="text-xs">
              Minimum Estimated Salary
            </Label>
            <InputGroup>
              <InputGroupInput
                id="minimumSalary"
                name="minimumSalary"
                placeholder="7.000.000"
                className="pl-1!"
              />
              <InputGroupAddon>
                <InputGroupText className="font-bold text-black">
                  Rp
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label className="text-xs">Maximum Estimated Salary</Label>
            <InputGroup>
              <InputGroupInput
                id="maximumSalary"
                name="maximumSalary"
                placeholder="8.000.000"
                className="pl-1!"
              />
              <InputGroupAddon>
                <InputGroupText className="font-bold text-black">
                  Rp
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-sm">
            Minimum Profile Information Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          {profileInfoReq.map((item: TProfileInfoReq, idx: number) => (
            <div
              key={item.name}
              className={`flex justify-between ${
                idx !== profileInfoReq.length - 1 && "border-b border-gray-300"
              }  py-4 items-center`}
            >
              <p className="text-sm">{item.name}</p>
              <div className="flex justify-between gap-2">
                <Button
                  type="button"
                  variant={"outline"}
                  className={`${
                    item.reqStatus === "mandatory"
                      ? "border-[#01959F] text-[#01959F] hover:text-[#01959F]"
                      : "border-gray-400 rounded-full text-gray-600"
                  } rounded-full`}
                  onClick={() => handleButtonProfile("mandatory", idx)}
                >
                  Mandatory
                </Button>
                <Button
                  type="button"
                  disabled={item.isMustMandatory}
                  variant={"outline"}
                  className={`${
                    item.reqStatus === "optional"
                      ? "border-[#01959F] text-[#01959F] hover:text-[#01959F]"
                      : "border-gray-400 rounded-full text-gray-600"
                  } rounded-full`}
                  onClick={() => handleButtonProfile("optional", idx)}
                >
                  Optional
                </Button>
                <Button
                  type="button"
                  disabled={item.isMustMandatory}
                  variant={"outline"}
                  className={`${
                    item.reqStatus === "off"
                      ? "border-[#01959F] text-[#01959F] hover:text-[#01959F]"
                      : "border-gray-400 rounded-full text-gray-600"
                  } rounded-full`}
                  onClick={() => handleButtonProfile("off", idx)}
                >
                  Off
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </form>
  );
};

export default CreateJobDialog;
