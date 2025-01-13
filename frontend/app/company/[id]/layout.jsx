"use client";

import DashboardCompany from "@/components/Dashboard-company";

const Layout = ({ children }) => {
  return (
    <DashboardCompany>
     {children}
    </DashboardCompany>
  )
};

export default Layout;
