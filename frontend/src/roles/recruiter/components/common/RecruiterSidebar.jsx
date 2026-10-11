import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiPlusCircle,
  FiBriefcase,
  FiUsers,
  FiUser,
  FiSearch,
} from "react-icons/fi";

const RecruiterSidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/recruiter/dashboard",
      icon: FiHome,
    },
    {
      name: "Post a Job",
      path: "/recruiter/post-job",
      icon: FiPlusCircle,
    },
    {
      name: "Manage Jobs",
      path: "/recruiter/manage-jobs",
      icon: FiBriefcase,
    },
    {
      name: "Applicants",
      path: "/recruiter/applicants",
      icon: FiUsers,
    },
    {
      name: "AI Candidate Search",
      path: "/recruiter/ai-candidate-search",
      icon: FiSearch,
    },
    {
      name: "Company Profile",
      path: "/recruiter/company",
      icon: FiUser,
    },
  ];

  return (
    <aside className="min-h-[calc(100vh-72px)] w-full bg-white">
      <div className="p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Recruiter
        </p>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default RecruiterSidebar;
