import Image from "next/image";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#FAFAFA] w-screen h-screen ">
      <div className="flex flex-col gap-6 w-full h-full justify-center items-center">
        <div className="w-[350px] sm:w-[500px] ">
          <Image
            src="/rakamin.png"
            alt="rakamin logo"
            width={145}
            height={50}
            loading="eager"
          />
        </div>

        <div className="bg-white shadow-sm w-[350px] sm:w-[500px]  h-fit p-10 gap-4 flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
