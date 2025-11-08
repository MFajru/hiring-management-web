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

interface ITopbar {
  avatarSrc?: string;
  avatarFallback?: string;
}

const Topbar = ({ avatarSrc: src, avatarFallback: fallback }: ITopbar) => {
  const { type, breadcrumb, title } = useTopbar();

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

      <Avatar>
        <AvatarImage
          src={src ? src : "https://github.com/shadcn.png"}
          alt="@shadcn"
        />
        <AvatarFallback>{fallback ? fallback : "AN"}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Topbar;
