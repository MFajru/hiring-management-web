import { Label } from "../ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group";
import { TextareaHTMLAttributes } from "react";

interface TTextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  name: string;
  placeholder: string;
  errorMsg?: string;
  label: string;
}

const TextAreaLabel = ({
  id,
  name,
  placeholder,
  errorMsg = "",
  label,
  ...props
}: TTextArea) => {
  return (
    <div className="w-full gap-2 flex flex-col">
      <Label htmlFor="jobdesc" className="text-xs font-normal">
        {label}
      </Label>
      <InputGroup className={errorMsg !== "" ? "border border-red-500" : ""}>
        <InputGroupTextarea
          placeholder={placeholder}
          id={id}
          name={name}
          {...props}
        />

        {errorMsg === "" ? (
          <InputGroupAddon align="block-end">
            <InputGroupText className="text-transparent text-xs ml-auto">
              no error
            </InputGroupText>
          </InputGroupAddon>
        ) : (
          <InputGroupAddon align="block-end">
            <InputGroupText className="text-red-500 text-xs ml-auto">
              {errorMsg}
            </InputGroupText>
          </InputGroupAddon>
        )}
      </InputGroup>
    </div>
  );
};

export default TextAreaLabel;
