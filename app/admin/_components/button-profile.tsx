import { Button } from "@/components/ui/button";
import React, { ButtonHTMLAttributes } from "react";

interface TButtonProfile extends ButtonHTMLAttributes<HTMLButtonElement> {
  reqStatus: string;
  textStatus: string;
  errorMsg?: string;
}

const ButtonProfile = ({
  textStatus,
  reqStatus,
  errorMsg = "",
  ...props
}: TButtonProfile) => {
  return (
    <Button
      type="button"
      variant={"outline"}
      className={`capitalize ${
        reqStatus === textStatus
          ? "border-[#01959F] text-[#01959F] hover:text-[#01959F]"
          : reqStatus === "" && errorMsg !== ""
          ? "border-red-500 text-gray-600"
          : "border-gray-400 text-gray-600"
      } rounded-full `}
      {...props}
    >
      {textStatus}
    </Button>
  );
};

export default ButtonProfile;
