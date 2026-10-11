import { useState, useRef } from "react";
import {
  X,
  LoaderCircle,
  BrainCircuit,
  FileText,
  Sparkles,
} from "lucide-react";

import { analyzeJobMatchWithResume } from "../../aiApi";
import ResumeUpload from "../common/ResumeUpload";
import MatchScore from "../AI-components/JobMatchAnalyzer/MatchScore";
import AnalysisSection from "../AI-components/JobMatchAnalyzer/AnalysisSection";

const JobMatchModal = ({ job, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  // Prevent duplicate API requests before React re-renders.
  const analyzingRef = useRef(false);

  if (!job) return null;

  const companyName = job.company?.name || "Company";

  const handleFileSelect = (file) => {
    if (analyzingRef.current) return;

    setSelectedFile(file);
    setAnalysis(null);
    setError("");
  };

  const handleAnalyze = async () => {
    if (analyzingRef.current) return;

    if (!selectedFile) {
      setError("Please upload your resume first.");
      return;
    }

    try {
      analyzingRef.current = true;
      setAnalyzing(true);
      setError("");
      setAnalysis(null);

      const response = await analyzeJobMatchWithResume(job._id, selectedFile);

      if (!response?.analysis) {
        throw new Error("The analysis response was empty.");
      }

      setAnalysis(response.analysis);
    } catch (err) {
      console.error("Failed to analyze job match:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to analyze your job match right now. Please try again.",
      );
    } finally {
      analyzingRef.current = false;
      setAnalyzing(false);
    }
  };

  const handleClose = () => {
    if (analyzingRef.current) return;
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6"
      onClick={handleClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-match-modal-title"
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between border-b border-slate-200 p-5 sm:p-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Sparkles size={21} />
              </div>

              <h2
                id="job-match-modal-title"
                className="text-xl font-bold text-slate-900 sm:text-2xl"
              >
                Analyze Your Job Match
              </h2>
            </div>

            <p className="mt-3 text-sm text-slate-600">
              {job.title} · {companyName}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Upload your resume to compare your qualifications with this job.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={analyzing}
            aria-label="Close job match analysis"
            className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={21} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">
          {!analysis && (
            <>
              {/* Selected Job */}
              <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                <h3 className="font-semibold text-indigo-950">Selected Job</h3>

                <p className="mt-1 text-sm font-medium text-indigo-900">
                  {job.title}
                </p>

                <p className="mt-1 text-sm text-indigo-800">
                  {companyName}
                  {job.location ? ` · ${job.location}` : ""}
                </p>

                <p className="mt-3 text-xs leading-5 text-indigo-700">
                  Your uploaded resume will be compared with the selected job's
                  details to generate a match report.
                </p>
              </div>

              {/* Resume Upload */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">
                  Your Resume
                </h3>

                <ResumeUpload
                  selectedFile={selectedFile}
                  onFileSelect={handleFileSelect}
                  buttonText={selectedFile ? "Change Resume" : "Upload Resume"}
                  disabled={analyzing}
                />

                {selectedFile && (
                  <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <FileText size={22} className="shrink-0 text-indigo-600" />

                    <div className="min-w-0">
                      <p className="break-all text-sm font-medium text-slate-800">
                        {selectedFile.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Resume selected
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                  <p className="font-semibold">Analysis unsuccessful</p>
                  <p className="mt-1">{error}</p>
                </div>
              )}

              {/* Analyze Button */}
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={!selectedFile || analyzing}
                aria-busy={analyzing}
                className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto ${
                  analyzing
                    ? "cursor-wait bg-indigo-700 text-white"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
                }`}
              >
                {analyzing ? (
                  <>
                    <LoaderCircle
                      size={19}
                      className="animate-spin"
                      aria-hidden="true"
                    />
                    Analyzing Your Match...
                  </>
                ) : (
                  <>
                    <Sparkles size={19} aria-hidden="true" />
                    Analyze My Match
                  </>
                )}
              </button>

              {/* AI Analysis Status */}
              {analyzing && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                      <BrainCircuit size={26} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-indigo-950 sm:text-lg">
                        AI is analyzing your resume
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-indigo-800">
                        We are comparing your resume with this job's skills,
                        qualifications, and requirements to prepare your
                        personalized match report.
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-indigo-700">
                        <LoaderCircle
                          size={17}
                          className="animate-spin"
                          aria-hidden="true"
                        />
                        <span>
                          Analysis in progress. This may take a few moments.
                        </span>
                      </div>

                      {/* Activity indicator, not a percentage estimate */}
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-indigo-200">
                        <div className="h-full w-1/3 animate-pulse rounded-full bg-indigo-600" />
                      </div>

                      <p className="mt-3 text-xs leading-5 text-indigo-700">
                        Please wait while the AI prepares your results. You
                        cannot change the resume during analysis.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Analysis Results */}
          {analysis && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Your Match Report
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {job.title} · {companyName}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setAnalysis(null);
                    setError("");
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Try Another Resume
                </button>
              </div>

              <MatchScore score={analysis.matchScore} jobTitle={job.title} />

              <AnalysisSection analysis={analysis} />

              <p className="text-xs leading-5 text-slate-500">
                This AI-generated score is an estimate, not a guarantee of
                interview selection. Review the recommendations and verify that
                they accurately reflect your experience.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-end border-t border-slate-200 bg-white p-4 sm:px-6">
          <button
            type="button"
            onClick={handleClose}
            disabled={analyzing}
            className="rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {analyzing ? "Please wait..." : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobMatchModal;
