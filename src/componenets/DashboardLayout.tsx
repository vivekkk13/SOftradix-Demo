import React from "react";
import { Navbar } from "../common/Navbar";
import Sidebar from "../common/Sidebar";

interface IProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: IProps) => {
  return (
    <div className="mainDashboardLayout">
      <div className="mainHeader">
        <Navbar />
      </div>
      <div className="mainBody">
        <div className="mainSidebar">
          <Sidebar />
        </div>
        <div className="mainContent">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
