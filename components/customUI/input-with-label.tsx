import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group";
import { Label } from "../ui/label";
import { InputHTMLAttributes } from "react";

interface TInputLabel extends InputHTMLAttributes<HTMLInputElement> {
  inputId: string;
  inputType: string;
  label: string;
  placeholder?: string;
  errorMsg?: string;
}

const InputLabel = ({
  inputId,
  inputType,
  label,
  placeholder,
  errorMsg,
  ...props
}: TInputLabel) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={inputId} className="font-normal text-xs">
        {label}
      </Label>
      <InputGroup>
        <InputGroupInput
          type={inputType}
          id={inputId}
          name={inputId}
          placeholder={placeholder}
          {...props}
        />
        {errorMsg && errorMsg !== "" && (
          <InputGroupAddon align="inline-end">
            <InputGroupText className="text-red-500 text-xs">
              {errorMsg}
            </InputGroupText>
          </InputGroupAddon>
        )}
      </InputGroup>
    </div>
  );
};

export default InputLabel;
