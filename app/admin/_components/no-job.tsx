import { Dispatch } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const NoJob = ({
  setIsDialogOpen,
}: {
  setIsDialogOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleButton = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Image
        src={"/noJobList.png"}
        alt="No jobs picture"
        width={283}
        height={277}
      />
      <div className="flex flex-col gap-1 text-center justify-center">
        <h4 className="font-bold">No job openings available</h4>
        <p>Create a job opening now and start the candidate process.</p>
      </div>
      <Button
        variant={"secondary"}
        id="createJob"
        name="createJob"
        className="text-black"
        onClick={() => handleButton()}
      >
        Create new job
      </Button>
    </>
  );
};

export default NoJob;
