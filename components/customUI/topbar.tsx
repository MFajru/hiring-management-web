"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { IBreadcrumb } from "@/types";
import { useTopbar } from "@/context/topbarContext";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface ITopbar {
  avatarSrc?: string;
  avatarFallback?: string;
}

const Topbar = ({ avatarSrc: src, avatarFallback: fallback }: ITopbar) => {
  const { type, breadcrumb, title } = useTopbar();
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/");
  };

  return (
    <div className="sticky top-0 left-0 w-full h-16 flex justify-between px-5 items-center border-b border-gray-300 bg-white shadow-sm">
      {type === "title" && <h3 className="font-bold text-lg">{title}</h3>}
      {type === "breadcrumb" && breadcrumb.length != 0 && (
        <>
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumb.map((item: IBreadcrumb, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={item.link} key={idx}>
                        {item.text}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {idx != breadcrumb.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </>
      )}
      <Popover>
        <PopoverTrigger>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src={src ? src : "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>{fallback ? fallback : "AN"}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="mr-4">
          <div className="flex flex-col">
            <Button
              onClick={() => handleLogout()}
              variant={"ghost"}
              className="justify-start text-left text-red-500 hover:text-red-500"
            >
              <div className="flex gap-2 items-center">
                <LogOut />
                <p>Logout</p>
              </div>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Topbar;
