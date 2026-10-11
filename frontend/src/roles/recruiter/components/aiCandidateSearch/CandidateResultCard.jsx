import { useState } from "react";
import { FiFileText, FiExternalLink, FiMapPin } from "react-icons/fi";

import CandidateMatchDetails from "./CandidateMatchDetails";

const CandidateResultCard = ({ candidate }) => {
  const [resumeError, setResumeError] = useState("");

  const score = Number.isFinite(Number(candidate.matchScore))
    ? Number(candidate.matchScore)
    : 0;

  const scoreStyle =
    score >= 80
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : score >= 60
        ? "border-blue-200 bg-blue-50 text-blue-700"
        : "border-orange-200 bg-orange-50 text-orange-700";

  const initials = (candidate.name || "Candidate")
    .trim()
    .charAt(0)
    .toUpperCase();

  const handleViewResume = () => {
    setResumeError("");

    if (!candidate.resumeUrl) {
      setResumeError("Resume URL is not available.");
      return;
    }

    window.open(candidate.resumeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-lg">
      {/* Candidate header */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-lg font-bold text-indigo-700 ring-1 ring-indigo-100">
              {initials}
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-base font-bold text-slate-900">
                {candidate.name || "Candidate"}
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                {candidate.headline || "Jobseeker"}
              </p>

              {candidate.location && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
                  <FiMapPin className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{candidate.location}</span>
                </p>
              )}
            </div>
          </div>

          <div
            className={`shrink-0 rounded-xl border px-3 py-2 text-center ${scoreStyle}`}
          >
            <p className="text-xl font-bold leading-6">{score}%</p>
            <p className="mt-1 text-[11px] font-semibold">Match score</p>
          </div>
        </div>

        {/* Candidate skills */}
        <section className="mt-6">
          <h4 className="text-sm font-semibold text-slate-800">
            Candidate skills
          </h4>

          <div className="mt-3 flex flex-wrap gap-2">
            {(candidate.skills || []).length > 0 ? (
              candidate.skills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-indigo-200 hover:bg-indigo-50"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                No skills listed on this profile.
              </p>
            )}
          </div>
        </section>

        {/* AI match analysis */}
        <div className="mt-6 border-t border-slate-100 pt-5">
          <CandidateMatchDetails candidate={candidate} />
        </div>

        {/* Resume action */}
        <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${
                  candidate.hasResume ? "bg-emerald-500" : "bg-slate-300"
                }`}
              />

              <p className="text-sm font-medium text-slate-700">
                {candidate.hasResume
                  ? "Resume available"
                  : "No resume uploaded"}
              </p>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Review the resume before making a decision.
            </p>
          </div>

          {candidate.resumeUrl && (
            <button
              type="button"
              onClick={handleViewResume}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            >
              <FiFileText className="h-4 w-4" />
              View Resume
              <FiExternalLink className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {resumeError && (
          <p role="alert" className="mt-3 text-sm text-red-600">
            {resumeError}
          </p>
        )}
      </div>

      {/* AI disclaimer */}
      <div className="border-t border-slate-100 bg-slate-50/80 px-5 py-3.5 sm:px-6">
        <p className="text-xs leading-5 text-slate-500">
          <span className="font-semibold text-slate-600">Note: </span>
          AI scores estimate profile relevance and do not guarantee candidate
          performance or hiring success.
        </p>
      </div>
    </article>
  );
};

export default CandidateResultCard;
