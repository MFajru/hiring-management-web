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

type TDatePicker = {
  label: string;
  placeholder: string;
};

const DatePicker = ({ label, placeholder }: TDatePicker) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="date" className="px-1 text-xs">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="justify-between items-center font-normal w-full"
          >
            <div className="flex gap-2 items-center font-normal w-full text-gray-500">
              <CalendarDays color="#1D1F20" size={14} />
              {date ? date.toLocaleDateString() : placeholder}
            </div>

            <ChevronDownIcon color="#B9B9B9" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
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
