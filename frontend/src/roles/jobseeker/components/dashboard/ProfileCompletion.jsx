import { Link } from "react-router-dom";
import { FiUser, FiArrowRight } from "react-icons/fi";

const ProfileCompletion = ({ profile }) => {
  const checks = [
    Boolean(profile?.name?.trim()),
    Boolean(profile?.email?.trim()),
    Boolean(profile?.phone?.trim()),
    Boolean(profile?.headline?.trim()),
    Boolean(profile?.bio?.trim()),
    Array.isArray(profile?.skills) && profile.skills.length > 0,
    Array.isArray(profile?.education) && profile.education.length > 0,
    Array.isArray(profile?.experience) && profile.experience.length > 0,
    Boolean(profile?.resume?.url || profile?.resumeUrl),
    Boolean(profile?.location?.trim()),
  ];

  const percentage = profile
    ? Math.round((checks.filter(Boolean).length / checks.length) * 100)
    : 0;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <FiUser className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">Your Profile</h2>
            <p className="mt-1 text-sm text-slate-500">
              Keep your profile updated so recruiters can learn more about you.
            </p>
          </div>
        </div>

        <Link
          to="/jobseeker/profile"
          className="inline-flex items-center gap-2 self-start text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          Edit Profile
          <FiArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-slate-700">
          Profile completion
        </span>
        <span className="text-sm font-bold text-blue-600">{percentage}%</span>
      </div>

      <div
        className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Profile completion"
      >
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {percentage < 100 && (
        <p className="mt-3 text-xs text-slate-500">
          Add missing details to improve your profile completeness.
        </p>
      )}
    </section>
  );
};

export default ProfileCompletion;
