import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Upload,
  Sparkles,
  LoaderCircle,
  BrainCircuit,
} from "lucide-react";

import { getAIJobRecommendations } from "../../aiApi";

const AIJobRecommendations = () => {
  const inputRef = useRef(null);
  const requestRef = useRef(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a PDF, DOC, or DOCX file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Resume must be less than 5 MB.");
      return;
    }

    setSelectedFile(file);
    setError("");
    setHasSearched(false);
    setRecommendations([]);
  };

  const handleGetRecommendations = async () => {
    if (requestRef.current) return;

    if (!selectedFile) {
      setError("Please upload your resume first.");
      return;
    }

    try {
      requestRef.current = true;
      setLoading(true);
      setError("");
      setHasSearched(false);
      setRecommendations([]);

      const data = await getAIJobRecommendations(selectedFile);

      setRecommendations(
        Array.isArray(data?.recommendations) ? data.recommendations : [],
      );
      setHasSearched(true);
    } catch (err) {
      console.error("Failed to get AI job recommendations:", err);

      setError(
        err.response?.data?.message ||
          "Unable to generate recommendations. Please try again.",
      );
    } finally {
      requestRef.current = false;
      setLoading(false);
    }
  };

  return (
    <section className="mb-6 mt-5 overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Sparkles size={21} />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">
              AI Job Recommendations
            </h2>

            <p className="mt-1 text-sm leading-5 text-slate-600">
              Discover jobs that best match your resume.
            </p>
          </div>
        </div>

        <span className="w-fit rounded-full border border-blue-100 bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          AI Powered
        </span>
      </div>

      {/* Resume Upload and Action */}
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:px-6">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-left transition hover:border-blue-400 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
            {selectedFile ? <FileText size={20} /> : <Upload size={20} />}
          </span>

          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-slate-800">
              {selectedFile ? selectedFile.name : "Upload your resume"}
            </span>

            <span className="mt-1 block text-xs text-slate-500">
              PDF, DOC or DOCX · Maximum 5 MB
            </span>
          </span>

          <span className="shrink-0 text-sm font-semibold text-blue-600">
            {selectedFile ? "Change" : "Choose"}
          </span>
        </button>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={handleGetRecommendations}
          disabled={loading || !selectedFile}
          aria-busy={loading}
          className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            loading
              ? "cursor-wait bg-blue-700 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
          }`}
        >
          {loading ? (
            <>
              <LoaderCircle
                size={18}
                className="animate-spin"
                aria-hidden="true"
              />
              Finding Matches...
            </>
          ) : (
            <>
              <Sparkles size={17} aria-hidden="true" />
              Find Matching Jobs
            </>
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mx-4 mb-4 rounded-xl border border-red-200 bg-red-50 p-4 sm:mx-6">
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* AI Processing Status */}
      {loading && (
        <div
          role="status"
          aria-live="polite"
          className="mx-4 mb-5 rounded-xl border border-blue-200 bg-blue-50 p-4 sm:mx-6 sm:p-5"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
              <BrainCircuit size={24} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-blue-950">
                AI is finding your best job matches
              </h3>

              <p className="mt-2 text-sm leading-6 text-blue-800">
                Your resume is being analyzed against available jobs. We are
                identifying relevant skills, comparing job requirements, and
                preparing personalized recommendations.
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-700">
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                  aria-hidden="true"
                />
                <span>Matching in progress. This may take a few moments.</span>
              </div>

              {/* Activity indicator, not an actual percentage */}
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-blue-200">
                <div className="h-full w-1/3 animate-pulse rounded-full bg-blue-600" />
              </div>

              <p className="mt-3 text-xs leading-5 text-blue-700">
                Please wait for the recommendations before starting another
                search.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {hasSearched && !loading && (
        <div className="border-t border-slate-100 bg-slate-50/70 p-4 sm:p-6">
          <div className="mb-4">
            <h3 className="font-semibold text-slate-900">
              Recommended for you
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {recommendations.length} matching{" "}
              {recommendations.length === 1 ? "job" : "jobs"} found
            </p>
          </div>

          {recommendations.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
              No relevant jobs found right now. Try again later as new jobs
              become available.
            </p>
          ) : (
            <div className="space-y-3">
              {recommendations.map((item) => {
                const job = item.job;

                if (!job?._id) return null;

                return (
                  <article
                    key={job._id}
                    className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
                  >
                    <div className="flex flex-col justify-between gap-3 sm:flex-row">
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900">
                          {job.title}
                        </h4>

                        <p className="mt-1 text-sm text-slate-600">
                          {job.company?.name || "Company"}
                          {job.location ? ` · ${job.location}` : ""}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {[job.workMode, job.jobType, job.experience]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>

                      <span className="h-fit w-fit shrink-0 rounded-lg bg-green-50 px-3 py-2 text-sm font-bold text-green-700">
                        {item.matchScore}% match
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {item.reason}
                    </p>

                    {item.matchedSkills?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.matchedSkills.map((skill, index) => (
                          <span
                            key={`${skill}-${index}`}
                            className="rounded-full bg-green-50 px-2.5 py-1 text-xs text-green-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.missingSkills?.length > 0 && (
                      <p className="mt-3 text-xs leading-5 text-slate-500">
                        Skills to develop: {item.missingSkills.join(", ")}
                      </p>
                    )}

                    <Link
                      to={`/jobseeker/jobs/${job._id}`}
                      className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      View Job Details
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default AIJobRecommendations;
