import Image from "next/image";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#FAFAFA] w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-6">
        <Image src="/rakamin.png" alt="rakamin logo" width={145} height={50} />
        <div className="bg-white shadow-sm w-[500px] h-fit p-10 gap-4 flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
