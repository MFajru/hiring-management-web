"use client";
import { IBreadcrumb } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

type TopbarContextType = {
  type: "breadcrumb" | "title";
  setType: (type: "breadcrumb" | "title") => void;
  title: string;
  setTitle: (title: string) => void;
  breadcrumb: IBreadcrumb[];
  setBreadcrumbItem: (breadcrumbItem: IBreadcrumb[]) => void;
};

const TopbarContext = createContext<TopbarContextType | undefined>(undefined);

export const TopbarProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<"breadcrumb" | "title">("title");
  const [breadcrumb, setBreadcrumbItem] = useState<IBreadcrumb[]>([]);
  const [title, setTitle] = useState<string>("");
  return (
    <TopbarContext.Provider
      value={{
        type,
        setType,
        breadcrumb,
        setBreadcrumbItem,
        title,
        setTitle,
      }}
    >
      {children}
    </TopbarContext.Provider>
  );
};

export const useTopbar = () => {
  const ctx = useContext(TopbarContext);
  if (!ctx) throw new Error("useTopbar must be used within TopbarProvider");
  return ctx;
};
