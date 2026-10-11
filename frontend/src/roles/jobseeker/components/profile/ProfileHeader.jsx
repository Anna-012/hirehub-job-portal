import { useRef, useState } from "react";
import { MapPin, Pencil, User, Camera } from "lucide-react";

import { uploadProfilePhoto } from "../../jobseekerApi";
import { useAuth } from "../../../../context/AuthContext";

const ProfileHeader = ({
  user,
  isEditing,
  onEdit,
  onCancel,
  onPhotoUpdated,
}) => {
  const fileInputRef = useRef(null);

  const { setUser: setAuthUser } = useAuth();

  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState("");

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setPhotoError("");

    // Frontend validation
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setPhotoError("Only PNG, JPG and WEBP images are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("Profile photo must be less than 2 MB.");
      event.target.value = "";
      return;
    }

    try {
      setUploadingPhoto(true);

      const data = await uploadProfilePhoto(file);

      // Update AuthContext
      setAuthUser(data.user);

      // Keep local Profile page state in sync
      if (onPhotoUpdated) {
        onPhotoUpdated(data.user);
      }
    } catch (error) {
      console.error("Failed to upload profile photo:", error);

      setPhotoError(
        error.response?.data?.message || "Failed to upload profile photo.",
      );
    } finally {
      setUploadingPhoto(false);

      // Allow selecting the same file again
      event.target.value = "";
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-blue-50 text-blue-600">
                {user?.profilePhoto?.url ? (
                  <img
                    src={user.profilePhoto.url}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User size={34} />
                )}
              </div>

              <button
                type="button"
                onClick={handlePhotoClick}
                disabled={uploadingPhoto}
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                title="Change profile photo"
              >
                <Camera size={15} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>

            {uploadingPhoto && (
              <p className="text-xs font-medium text-blue-600">Uploading...</p>
            )}

            {photoError && (
              <p className="max-w-40 text-center text-xs text-red-600">
                {photoError}
              </p>
            )}
          </div>

          <div className="min-w-0 pt-1">
            <h1 className="text-2xl font-bold text-slate-900">
              {user?.name || "Your Name"}
            </h1>

            <p className="mt-1 text-sm font-medium text-blue-600">
              {user?.headline || "Add a professional headline"}
            </p>

            {user?.location && (
              <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin size={15} />
                <span>{user.location}</span>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={isEditing ? onCancel : onEdit}
          className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
            isEditing
              ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {!isEditing && <Pencil size={16} />}
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
