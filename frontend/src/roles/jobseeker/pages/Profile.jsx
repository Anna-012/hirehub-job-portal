import { useEffect, useState } from "react";

import { useAuth } from "../../../context/AuthContext";

import { getMyProfile, updateMyProfile } from "../jobseekerApi";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileView from "../components/profile/ProfileView";
import ProfileEditForm from "../components/profile/ProfileEditForm";
import SkeletonLoader from "../../components/common/SkeletonLoader";

const Profile = () => {
  const { setUser: setAuthUser } = useAuth();

  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    headline: "",
    bio: "",
    skills: [],
    education: [],
    experience: [],
    linkedin: "",
    github: "",
    portfolio: "",
    resume: {
      url: "",
      publicId: "",
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  // Create form data
  const createFormData = (userData) => ({
    name: userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    location: userData?.location || "",
    headline: userData?.headline || "",
    bio: userData?.bio || "",
    skills: userData?.skills || [],
    education: userData?.education || [],
    experience: userData?.experience || [],
    linkedin: userData?.linkedin || "",
    github: userData?.github || "",
    portfolio: userData?.portfolio || "",
    resume: userData?.resume || {
      url: "",
      publicId: "",
    },
  });

  // Fetch profile
  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyProfile();

        if (!isMounted) return;

        setUser(data.user);
        setAuthUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setFormData(createFormData(data.user));
      } catch (err) {
        if (!isMounted) return;

        console.error("Failed to fetch profile:", err);

        setError(err.response?.data?.message || "Failed to load profile.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [setAuthUser]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [success]);

  // Edit profile
  const handleEdit = () => {
    setError("");
    setSuccess("");
    setFormData(createFormData(user));
    setIsEditing(true);
  };

  // Cancel editing
  const handleCancel = () => {
    setError("");
    setSuccess("");
    setFormData(createFormData(user));
    setIsEditing(false);
  };

  // Save profile
  const handleSave = async (event) => {
    event.preventDefault();

    if (saving) return;

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const education = formData.education.map((item) => ({
        ...item,
        subjects: Array.isArray(item.subjects)
          ? item.subjects
          : (item.subjects || "")
              .split(",")
              .map((subject) => subject.trim())
              .filter(Boolean),
      }));

      const data = await updateMyProfile({
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        headline: formData.headline,
        bio: formData.bio,
        skills: formData.skills,
        education,
        experience: formData.experience,
        linkedin: formData.linkedin,
        github: formData.github,
        portfolio: formData.portfolio,
      });

      setUser(data.user);
      setAuthUser(data.user);

      localStorage.setItem("user", JSON.stringify(data.user));

      setFormData(createFormData(data.user));
      setIsEditing(false);
      setSuccess("Profile updated successfully.");
    } catch (err) {
      console.error("Failed to update profile:", err);

      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  // Update profile after resume upload
  const handleResumeUpdated = (updatedUser) => {
    setUser(updatedUser);
    setAuthUser(updatedUser);

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setFormData(createFormData(updatedUser));
    setSuccess("Resume updated successfully.");
    setError("");
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="space-y-6" role="status" aria-label="Loading profile">
        {/* Profile header skeleton */}
        <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="h-16 w-16 shrink-0 rounded-full bg-slate-200" />

            <div className="min-w-0 flex-1 space-y-3">
              <div className="h-5 w-48 max-w-full rounded bg-slate-200" />
              <div className="h-4 w-64 max-w-full rounded bg-slate-200" />
            </div>

            <div className="h-10 w-24 rounded-lg bg-slate-200" />
          </div>
        </div>

        {/* Personal information skeleton */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 h-5 w-40 animate-pulse rounded bg-slate-200" />

          <SkeletonLoader count={4} variant="text" />
        </div>

        {/* Education and experience skeleton */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 h-5 w-48 animate-pulse rounded bg-slate-200" />

          <SkeletonLoader count={3} variant="list" />
        </div>

        <span className="sr-only">Loading your profile...</span>
      </div>
    );
  }

  // Error state with retry
  if (error && !user) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Unable to load your profile
        </h2>

        <p className="mt-2 text-sm text-red-600">{error}</p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Profile UI
  return (
    <div className="space-y-5">
      <ProfileHeader user={user} isEditing={isEditing} onEdit={handleEdit} />

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Success message */}
      {success && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {success}
        </div>
      )}

      {/* Edit or view profile */}
      {isEditing ? (
        <ProfileEditForm
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          saving={saving}
          onCancel={handleCancel}
          onResumeUpdated={handleResumeUpdated}
        />
      ) : (
        <ProfileView user={user} />
      )}
    </div>
  );
};

export default Profile;
