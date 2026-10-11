import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiCamera,
  FiLoader,
} from "react-icons/fi";

import { useAuth } from "../../../../context/AuthContext";
import { uploadRecruiterProfilePhoto } from "../../recruiterApi";

const RecruiterNavbar = () => {
  const navigate = useNavigate();
  const { user, setUser, logout } = useAuth();

  const fileInputRef = useRef(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [error, setError] = useState("");

  const recruiterName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : "Recruiter";
  const recruiterEmail = user?.email || "Recruiter Account";

  // profilePhoto is an object in the backend schema.
  const profileImage =
    user?.profilePhoto?.url ||
    user?.avatar ||
    user?.photoURL ||
    user?.profilePicture ||
    "";

  const initials =
    recruiterName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "R";

  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];

    // Allow selecting the same file again later.
    event.target.value = "";

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      return;
    }

    try {
      setUploading(true);

      const data = await uploadRecruiterProfilePhoto(file);

      if (!data?.success || !data?.user) {
        throw new Error(data?.message || "Photo upload failed.");
      }

      // Update React context immediately.
      setUser(data.user);

      // Persist the updated user for page refreshes.
      localStorage.setItem("user", JSON.stringify(data.user));

      setImageError(false);
      setError("");
    } catch (err) {
      console.error("Profile photo upload error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Could not upload profile photo.",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    if (logout) {
      await logout();
      navigate("/login");
    }
  };

  return (
    <header className="flex h-full items-center justify-between border-b border-slate-100 bg-white px-4 sm:px-6">
      {/* HireHub Logo */}
      <button
        type="button"
        onClick={() => navigate("/recruiter/dashboard")}
        className="flex shrink-0 items-center"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
          <span className="text-xl font-bold text-white">H</span>
        </div>

        <h1 className="ml-3 text-xl font-bold text-slate-900">
          Hire<span className="text-blue-600">Hub</span>
        </h1>
      </button>

      {/* Recruiter Profile */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
          aria-expanded={dropdownOpen}
          aria-label="Open recruiter profile menu"
          className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-50"
        >
          {profileImage && !imageError ? (
            <img
              src={profileImage}
              alt={recruiterName}
              onError={() => setImageError(true)}
              className="h-10 w-10 rounded-full border border-slate-200 object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 font-semibold text-blue-600">
              {initials}
            </div>
          )}

          <div className="hidden text-left sm:block">
            <p className="max-w-40 truncate text-sm font-semibold text-slate-900">
              {recruiterName}
            </p>
            <p className="max-w-48 truncate text-xs text-slate-400">
              {recruiterEmail}
            </p>
          </div>

          <FiChevronDown
            size={18}
            className={`text-slate-400 transition-transform ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Profile Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 top-full z-[60] mt-2 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
            {/* Recruiter Details */}
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
              {profileImage && !imageError ? (
                <img
                  src={profileImage}
                  alt={recruiterName}
                  onError={() => setImageError(true)}
                  className="h-11 w-11 shrink-0 rounded-full border border-slate-200 object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 font-semibold text-blue-600">
                  {initials}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {recruiterName}
                </p>
                <p className="mt-1 truncate text-xs text-slate-500">
                  {recruiterEmail}
                </p>
              </div>
            </div>

            {/* Upload Profile Photo */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />

            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading ? (
                <FiLoader className="animate-spin" size={17} />
              ) : (
                <FiCamera size={17} />
              )}

              {uploading
                ? "Uploading photo..."
                : profileImage
                  ? "Change profile photo"
                  : "Upload profile photo"}
            </button>

            {error && (
              <p
                role="alert"
                className="mx-4 mb-2 rounded-md bg-red-50 px-3 py-2 text-xs text-red-600"
              >
                {error}
              </p>
            )}

            {/* Existing Company Profile Link */}
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                navigate("/recruiter/company");
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
            >
              <FiUser size={17} />
              View Company Profile
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 transition hover:bg-red-50"
            >
              <FiLogOut size={17} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default RecruiterNavbar;
