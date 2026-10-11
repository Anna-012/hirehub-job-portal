import React from "react";
import { Outlet } from "react-router-dom";

import JobSeekerNavbar from "../roles/jobseeker/components/common/JobSeekerNavbar";
import JobSeekerSidebar from "../roles/jobseeker/components/common/JobSeekerSidebar";

const JobseekerLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <JobSeekerNavbar />
      <JobSeekerSidebar />

      <main className="ml-56 pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default JobseekerLayout;
