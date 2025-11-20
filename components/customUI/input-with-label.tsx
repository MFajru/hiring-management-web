import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group";
import { Label } from "../ui/label";
import React, { InputHTMLAttributes } from "react";

interface TInputLabel extends InputHTMLAttributes<HTMLInputElement> {
  inputId: string;
  inputType: string;
  label: string;
  placeholder?: string;
  errorMsg?: string;
  prefix?: string;
  noErrorText?: boolean;
  prefixIcon?: React.ReactNode;
  prefixIconAlign?:
    | "inline-start"
    | "inline-end"
    | "block-start"
    | "block-end"
    | null
    | undefined;
  isMandatory?: boolean;
}

const InputLabel = ({
  inputId,
  inputType,
  label,
  placeholder,
  errorMsg = "",
  prefix = "",
  noErrorText = false,
  prefixIcon = null,
  prefixIconAlign = "inline-start",
  isMandatory = false,
  ...props
}: TInputLabel) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={inputId} className="font-normal text-xs gap-0">
        {label}
        <span className="text-red-500">{isMandatory ? "*" : ""}</span>
      </Label>

      <InputGroup className={errorMsg !== "" ? "border border-red-500" : ""}>
        <InputGroupInput
          type={inputType}
          id={inputId}
          name={inputId}
          placeholder={placeholder}
          {...props}
        />
        {prefixIcon !== null && (
          <InputGroupAddon align={prefixIconAlign} className="pl-0">
            <InputGroupAddon>{prefixIcon}</InputGroupAddon>
          </InputGroupAddon>
        )}
        {prefix !== "" && (
          <InputGroupAddon>
            <InputGroupText className="font-bold text-black">
              {prefix}
            </InputGroupText>
          </InputGroupAddon>
        )}
        {!noErrorText && errorMsg && errorMsg !== "" && (
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
