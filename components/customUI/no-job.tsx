import { ReactNode } from "react";
import Image from "next/image";

type TNoJob = {
  headerText: string;
  bodyText: string;
  children?: ReactNode;
};

const NoJob = ({ headerText, bodyText, children }: TNoJob) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full mt-32">
      <Image
        src={"/noJobList.png"}
        alt="No jobs picture"
        width={283}
        height={277}
      />
      <div className="flex flex-col gap-1 text-center justify-center">
        <h4 className="font-bold">{headerText}</h4>
        <p>{bodyText}</p>
      </div>
      {children}
    </div>
  );
};

export default NoJob;
