import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { User, LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../../context/AuthContext";

const JobSeekerNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Profile data available from AuthContext
  const profileLoading = !user;

  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);
      setIsProfileOpen(false);
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-between px-5">
        {/* Logo */}
        <button
          type="button"
          onClick={() => navigate("/jobseeker/dashboard")}
          className="flex items-center gap-2.5"
          aria-label="HireHub dashboard"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white">
            H
          </div>

          <span className="text-xl font-bold text-slate-900">
            Hire<span className="text-blue-600">Hub</span>
          </span>
        </button>

        {/* Right side */}
        <div className="flex items-center gap-5">
          <div className="h-8 w-px bg-slate-200" />

          {/* Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                if (!profileLoading) {
                  setIsProfileOpen((current) => !current);
                }
              }}
              disabled={profileLoading}
              aria-expanded={isProfileOpen}
              aria-haspopup="menu"
              className="flex items-center gap-2.5 rounded-lg transition hover:bg-slate-50 disabled:cursor-wait"
            >
              {/* Profile photo skeleton / image */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-50 text-blue-600">
                {profileLoading ? (
                  <div className="h-full w-full animate-pulse rounded-full bg-slate-200" />
                ) : user?.profilePhoto?.url ? (
                  <img
                    src={user.profilePhoto.url}
                    alt={`${user?.name || "User"} profile`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User size={19} aria-hidden="true" />
                )}
              </div>

              {/* Name and role */}
              <div className="hidden text-left sm:block">
                {profileLoading ? (
                  <div className="space-y-2 py-1">
                    <div className="h-3.5 w-24 animate-pulse rounded bg-slate-200" />
                    <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
                  </div>
                ) : (
                  <>
                    <p className="max-w-40 truncate text-sm font-semibold text-slate-900">
                      {user?.name || "User"}
                    </p>

                    <p className="text-xs text-slate-400">Job Seeker</p>
                  </>
                )}
              </div>

              {/* Chevron */}
              <FiChevronDown
                size={16}
                className={`text-slate-500 transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Profile dropdown */}
            {isProfileOpen && !profileLoading && (
              <div
                role="menu"
                className="absolute right-0 top-12 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-lg"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    navigate("/jobseeker/profile");
                    setIsProfileOpen(false);
                  }}
                  className="block w-full px-4 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  My Profile
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-wait disabled:opacity-70"
                >
                  {loggingOut && (
                    <LoaderCircle
                      size={15}
                      className="animate-spin"
                      aria-hidden="true"
                    />
                  )}

                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default JobSeekerNavbar;
