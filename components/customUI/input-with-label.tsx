import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { InputHTMLAttributes } from "react";

interface TInputLabel extends InputHTMLAttributes<HTMLInputElement> {
  inputId: string;
  inputType: string;
  label: string;
  placeholder?: string;
}

const InputLabel = ({
  inputId,
  inputType,
  label,
  placeholder,
  ...props
}: TInputLabel) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={inputId} className="font-normal text-xs">
        {label}
      </Label>
      <Input
        type={inputType}
        id={inputId}
        name={inputId}
        placeholder={placeholder}
        {...props}
      ></Input>
    </div>
  );
};

export default InputLabel;
