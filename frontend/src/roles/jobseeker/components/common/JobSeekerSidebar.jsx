import {
  FiHome,
  FiSearch,
  FiFileText,
  FiBookmark,
  FiUser,
  FiStar,
  FiBell,
  FiSettings,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

const JobSeekerSidebar = () => {
  const menuItems = [
    {
      label: "Dashboard",
      icon: FiHome,
      path: "/jobseeker",
    },
    {
      label: "Find Jobs",
      icon: FiSearch,
      path: "/jobseeker/jobs",
    },
    {
      label: "My Applications",
      icon: FiFileText,
      path: "/jobseeker/applications",
    },
    {
      label: "Saved Jobs",
      icon: FiBookmark,
      path: "/jobseeker/saved-jobs",
    },

    {
      label: "AI Tools",
      icon: FiStar,
      path: "/jobseeker/ai-tools",
      badge: "AI",
    },
    {
      label: "Profile",
      icon: FiUser,
      path: "/jobseeker/profile",
    },
  ];

  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-56 border-r border-slate-200 bg-white">
      <nav className="flex h-full flex-col px-3 py-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === "/jobseeker"}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <Icon size={18} />

                <span className="flex-1 text-left">{item.label}</span>

                {item.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      item.badge === "AI"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default JobSeekerSidebar;
