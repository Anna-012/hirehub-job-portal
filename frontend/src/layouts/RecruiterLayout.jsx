import { Outlet } from "react-router-dom";

import RecruiterNavbar from "../roles/recruiter/components/common/RecruiterNavbar";
import RecruiterSidebar from "../roles/recruiter/components/common/RecruiterSidebar";

const RecruiterLayout = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      {/* Fixed Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 h-[72px]">
        <RecruiterNavbar />
      </header>

      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-[72px] z-40 hidden h-[calc(100vh-72px)] w-[280px] overflow-y-auto overflow-x-hidden bg-white md:block">
        <RecruiterSidebar />
      </aside>

      {/* Main Content */}
      <main className="min-w-0 pt-[72px] md:ml-[280px]">
        <div className="min-h-[calc(100vh-72px)] min-w-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RecruiterLayout;
