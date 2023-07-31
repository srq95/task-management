import DashboardHeader from "@/components/DashboardComponents/DashboardHeader";
import SideMenu from "@/components/DashboardComponents/SideMenu";
import { Poppins } from "next/font/google";
import React from "react";

type ChildrenProps = {
  children: React.ReactNode;
};

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const DashboardLayout: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div>
      <main className={`dashboard-area ${poppins.className}`}>
        <SideMenu />
        <div className="dashboard-rightArea">
          <DashboardHeader />
          <div className="dashboard-contentArea">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
