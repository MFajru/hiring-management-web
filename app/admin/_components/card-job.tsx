import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CardJob = () => {
  return (
    <div className="flex flex-col w-full shadow-md p-6 rounded-2xl gap-3">
      <div className="flex gap-4">
        <Badge variant={"success"}>Active</Badge>
        <Badge variant={"date"}>Started on 1 Oct 2025</Badge>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-0">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Front End Developer</h3>
          <p className="text-gray-600">Rp 7.000.000 - Rp 8.000.000</p>
        </div>
        <Button id="manageJob" name="manageJob">
          Manage Job
        </Button>
      </div>
    </div>
  );
};

export default CardJob;
