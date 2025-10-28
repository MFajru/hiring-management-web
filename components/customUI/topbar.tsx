"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { IBreadcrumb } from "@/types/components";
import { useTopbar } from "@/context/topbarContext";

interface ITopbar {
  src?: string;
  fallback?: string;
}

const Topbar = ({ src, fallback }: ITopbar) => {
  const { type, breadcrumb, title } = useTopbar();

  return (
    <div className="w-full h-16 flex justify-between px-5 items-center border-b border-gray-300 bg-white shadow-sm">
      {type === "title" && <h3 className="font-bold text-lg">{title}</h3>}
      {type === "breadcrumb" && breadcrumb.length != 0 && (
        <>
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumb.map((item: IBreadcrumb, idx) => {
                return (
                  <BreadcrumbItem key={idx}>
                    <BreadcrumbLink asChild>
                      <Link href={item.link}>{item.text}</Link>
                    </BreadcrumbLink>
                    {idx != breadcrumb.length - 1 && <BreadcrumbSeparator />}
                  </BreadcrumbItem>
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
