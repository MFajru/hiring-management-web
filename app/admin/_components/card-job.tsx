import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import formatToIdr from "@/lib/formatToIdr";
import moment from "moment";

type TCardJob = {
  jobName: string;
  status: string;
  minSalary: number;
  maxSalary: number;
  createdDate: string;
  handleManageJob: () => void;
};

const CardJob = ({
  jobName,
  status,
  minSalary,
  maxSalary,
  createdDate,
  handleManageJob,
}: TCardJob) => {
  return (
    <div className="flex flex-col w-full shadow-md p-6 rounded-2xl gap-3">
      <div className="flex gap-4">
        <Badge variant={"success"} className="capitalize">
          {status}
        </Badge>
        <Badge variant={"date"}>
          Started on {moment(createdDate).format("D MMM YYYY")}
        </Badge>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-0">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg capitalize">{jobName}</h3>
          <p className="text-gray-600">
            {formatToIdr(minSalary)} - {formatToIdr(maxSalary)}
          </p>
        </div>
        <Button
          id="manageJob"
          name="manageJob"
          onClick={() => handleManageJob()}
        >
          Manage Job
        </Button>
      </div>
    </div>
  );
};

export default CardJob;
