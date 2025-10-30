import InputLabel from "@/components/customUI/input-with-label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

const Tttt = () => {
  return (
    <div>
      <form action="">
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
              <div className="flex items-end h-full">
                <p className="text-gray-400 h-full">-</p>
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
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-sm">
                  Minimum Profile Information Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between border-b border-gray-300 pb-4 items-center">
                  <p className="text-sm">Full name</p>
                  <div className="flex justify-between gap-2">
                    <Button
                      variant={"outline"}
                      className="border-[#01959F] rounded-full text-[#01959F] hover:text-[#01959F]"
                    >
                      Mandatory
                    </Button>
                    <Button
                      variant={"outline"}
                      className="border-gray-400 rounded-full text-gray-600"
                    >
                      Optional
                    </Button>
                    <Button
                      variant={"outline"}
                      className="border-gray-400 rounded-full text-gray-600"
                    >
                      Off
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Tttt;
