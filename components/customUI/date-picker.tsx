"use client";

import * as React from "react";
import { CalendarDays, ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "../ui/calendar";
import moment from "moment";
import { Dispatch, SetStateAction, useEffect } from "react";
import { da } from "date-fns/locale";
import { Matcher } from "react-day-picker";

type TDatePicker = {
  label: string;
  placeholder: string;
  disabled?: Matcher | Matcher[];
  isMandatory?: boolean;
  errorMsg?: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
};

const DatePicker = ({
  label,
  placeholder,
  setSelectedDate,
  isMandatory,
  errorMsg,
  disabled,
}: TDatePicker) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  useEffect(() => {
    if (date) {
      setSelectedDate(moment(date).format().toString());
    }
  }, [date]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex">
        <Label htmlFor="date" className="text-xs">
          {label}
        </Label>
        <p className="text-red-500 text-xs">{isMandatory ? "*" : ""}</p>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={`relative justify-between items-center font-normal w-full ${
              errorMsg !== "" ? "border-red-500" : ""
            }`}
          >
            <div className="flex gap-2 items-center font-normal w-full text-gray-500">
              <CalendarDays color="#1D1F20" size={14} />
              <p className={`${date ? "text-black" : ""}`}>
                {date ? date.toLocaleDateString() : placeholder}
              </p>
            </div>
            <p className="text-xs text-red-500 absolute right-8">{errorMsg}</p>

            <ChevronDownIcon color="#B9B9B9" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            disabled={disabled}
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
