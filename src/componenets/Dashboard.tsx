import React from "react";
import { Navbar } from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import DashboardLayout from "./DashboardLayout";

export default function Dashboard() {
  return (
    <>
      <DashboardLayout>
        <h3>This is Dashboard layout</h3>
      </DashboardLayout>
    </>
  );
}
