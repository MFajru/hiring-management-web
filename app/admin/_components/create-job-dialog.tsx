"use client";

import InputLabel from "@/components/customUI/input-with-label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
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
import { TErrorMsg, TJobList, TProfileInfoReq } from "../page";
import { ChangeEvent } from "react";
import TextAreaLabel from "@/components/customUI/textarea-with-label";
import ButtonProfile from "./button-profile";

type TCreateJobDialog = {
  jobData: Partial<TJobList>;
  errorMsg: TErrorMsg;
  handleOnChange: (
    e: ChangeEvent<HTMLInputElement> | string | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleButtonProfile: (
    param: "mandatory" | "optional" | "off",
    idx: number
  ) => void;
};

const CreateJobDialog = ({
  jobData,
  errorMsg,
  handleOnChange,
  handleButtonProfile,
}: TCreateJobDialog) => {
  return (
    <>
      <InputLabel
        inputId="jobName"
        inputType="text"
        name="jobName"
        label="Job Name"
        placeholder="Ex. Front End Engineer"
        errorMsg={errorMsg.jobName}
        value={jobData.jobName}
        onChange={handleOnChange}
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor="jobType" className="text-xs font-normal">
          Job Type
        </Label>
        <div className="flex flex-col gap-2 relative">
          <Select onValueChange={handleOnChange} value={jobData.jobType}>
            <SelectTrigger
              className={`w-full border ${
                errorMsg.jobType !== "" ? "border-red-500" : ""
              } `}
            >
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-red-500 text-xs absolute right-8 top-2.5">
            {errorMsg.jobType}
          </p>
        </div>
      </div>

      <TextAreaLabel
        placeholder="Ex. Successfully gaining more customers"
        id="jobdesc"
        name="jobDesc"
        errorMsg={errorMsg.jobDesc}
        label="Job Description"
        value={jobData.jobDesc}
        onChange={handleOnChange}
      />
      <InputLabel
        inputId="numOfCandidate"
        inputType="text"
        label="Number of Candidate Needed"
        placeholder="Ex. 2"
        name="numOfCandidate"
        errorMsg={errorMsg.numOfCandidate}
        value={jobData.numOfCandidate === 0 ? "" : jobData.numOfCandidate}
        onChange={handleOnChange}
      />

      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-between">
          <h5 className="text-xs">Job Salary</h5>
          {errorMsg.minimumSalary !== "" && errorMsg.maximumSalary !== "" && (
            <p className="text-red-500 text-xs font-medium pr-3">
              Salary must be filled
            </p>
          )}
        </div>
        <div className="flex items-center justify-between w-full gap-4">
          <InputLabel
            inputId="minimumSalary"
            name="minimumSalary"
            inputType="text"
            label="Minimum Estimated Salary"
            placeholder="7.000.000"
            prefix="Rp"
            errorMsg={errorMsg.minimumSalary}
            noErrorText={true}
            className="pl-1!"
            value={
              jobData.minimumSalary === 0
                ? ""
                : new Intl.NumberFormat("id-ID").format(
                    jobData.minimumSalary as number
                  )
            }
            onChange={handleOnChange}
          />
          <InputLabel
            label="Maximum Estimated Salary"
            inputId="maximumSalary"
            name="maximumSalary"
            inputType="text"
            placeholder="8.000.000"
            prefix="Rp"
            errorMsg={errorMsg.maximumSalary}
            noErrorText={true}
            className="pl-1!"
            value={
              jobData.maximumSalary === 0
                ? ""
                : new Intl.NumberFormat("id-ID").format(
                    jobData.maximumSalary as number
                  )
            }
            onChange={handleOnChange}
          />
        </div>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-sm">
            Minimum Profile Information Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          {jobData.requiredInfo &&
            jobData.requiredInfo.map((item: TProfileInfoReq, idx: number) => (
              <div
                key={item.name}
                className={`relative flex justify-between ${
                  jobData.requiredInfo &&
                  idx !== jobData.requiredInfo.length - 1 &&
                  "border-b border-gray-300"
                }  py-4 items-center`}
              >
                <p className="text-sm">{item.name}</p>
                {item.reqStatus === "" ? (
                  <p className="text-red-500 text-xs absolute bottom-0 w-full">
                    {errorMsg[item.slug as keyof TErrorMsg]}
                  </p>
                ) : (
                  <p className="text-transparent text-xs absolute bottom-0 w-full"></p>
                )}

                <div className="flex justify-between gap-2">
                  {["mandatory", "optional", "off"].map((text, i) => (
                    <ButtonProfile
                      key={i}
                      disabled={item.isMustMandatory && text !== "mandatory"}
                      reqStatus={item.reqStatus}
                      textStatus={text}
                      errorMsg={errorMsg[item.slug as keyof TErrorMsg]}
                      onClick={() =>
                        handleButtonProfile(
                          text as "mandatory" | "optional" | "off",
                          idx
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
        </CardContent>
      </Card>
    </>
  );
};

export default CreateJobDialog;
