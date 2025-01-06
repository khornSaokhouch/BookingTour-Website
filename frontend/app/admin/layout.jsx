"use client";

import Dashboard from "@/components/Dashboard";

const Layout = ({ children }) => {
  return (
    <Dashboard>
      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>
    </Dashboard>
  );
};

export default Layout;