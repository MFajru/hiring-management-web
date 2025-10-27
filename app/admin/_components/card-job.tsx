import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";

const CardJob = () => {
  return (
    <div className="flex flex-col w-full shadow-md p-6 rounded-2xl gap-3">
      <div className="flex gap-4">
        <Badge variant={"success"}>Active</Badge>
        <Badge variant={"date"}>Started on 1 Oct 2025</Badge>
      </div>
      <div className="flex justify-between items-end">
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
