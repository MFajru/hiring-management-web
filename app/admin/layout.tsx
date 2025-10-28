import Topbar from "@/components/customUI/topbar";
import { TopbarProvider } from "@/context/topbarContext";
import { ReactElement } from "react";

const AdminLayout = ({ children }: { children: ReactElement }) => {
  return (
    <TopbarProvider>
      <div>
        <Topbar></Topbar>
        <div className="flex flex-col sm:flex-row px-5 gap-6 mt-9 w-full">
          {children}
        </div>
      </div>
    </TopbarProvider>
  );
};

export default AdminLayout;
