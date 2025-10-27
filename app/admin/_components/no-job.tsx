import { Button } from "@/components/ui/button";
import Image from "next/image";
const NoJob = () => {
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
      >
        Create new job
      </Button>
    </>
  );
};

export default NoJob;
