import { useState } from "react";
import { FileText, Sparkles, LoaderCircle, CheckCircle2 } from "lucide-react";

import ResumeUpload from "../../common/ResumeUpload";
import ResumeAnalysisResult from "./ResumeAnalysisResult";
import SkeletonLoader from "../../../../components/common/SkeletonLoader";
import api from "../../../../../services/api";

const ResumeAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setAnalysis(null);
    setError("");
  };

  const handleAnalyze = async () => {
    if (!selectedFile || analyzing) {
      if (!selectedFile) {
        setError("Please upload your resume first.");
      }
      return;
    }

    try {
      setAnalyzing(true);
      setError("");
      setAnalysis(null);

      const formData = new FormData();
      formData.append("resume", selectedFile);

      const response = await api.post("/ai/analyze-uploaded-resume", formData);

      setAnalysis(response.data.analysis);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to analyze your resume right now.",
      );
    } finally {
      setAnalyzing(false);
    }
  };

  const closeAnalysis = () => {
    setAnalysis(null);
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <FileText size={22} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">Resume Analyzer</h2>

          <p className="mt-1 text-sm text-slate-500">
            Get your resume score, strengths, and improvement suggestions.
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <div className="space-y-5 p-5 sm:p-6">
        <ResumeUpload
          selectedFile={selectedFile}
          onFileSelect={handleFileSelect}
          buttonText={selectedFile ? "Change Resume" : "Upload Resume"}
          disabled={analyzing}
        />
        {selectedFile && (
          <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <FileText size={20} className="mt-0.5 shrink-0 text-indigo-600" />

            <div className="min-w-0 flex-1">
              <p className="break-all text-sm font-semibold text-slate-800">
                {selectedFile.name}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · Resume
                selected
              </p>
            </div>

            {!analyzing && (
              <CheckCircle2 size={19} className="shrink-0 text-green-600" />
            )}
          </div>
        )}
        {/* Error */}
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}
        {/* Analyze Button */}

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={analyzing}
          aria-busy={analyzing}
          className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            analyzing
              ? "cursor-wait bg-blue-700"
              : "bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
          }`}
        >
          {analyzing ? (
            <>
              <LoaderCircle
                size={19}
                className="animate-spin"
                aria-hidden="true"
              />
              Analyzing Resume...
            </>
          ) : (
            <>
              <Sparkles size={19} aria-hidden="true" />
              Analyze My Resume
            </>
          )}
        </button>

        {/* Visible AI Processing State */}
        {analyzing && (
          <div
            role="status"
            aria-live="polite"
            className="space-y-4 rounded-xl border border-indigo-100 bg-indigo-50/70 p-4 sm:p-5"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <LoaderCircle size={22} className="animate-spin" />
              </div>

              <div>
                <p className="font-semibold text-indigo-950">
                  AI is reviewing your resume
                </p>

                <p className="mt-1 text-sm leading-6 text-indigo-800">
                  We are evaluating your resume and preparing personalized
                  feedback. This may take a few moments.
                </p>
              </div>
            </div>

            <SkeletonLoader count={3} variant="text" />

            <p className="text-xs text-indigo-700">
              Please keep this page open while the analysis is in progress.
            </p>
          </div>
        )}
      </div>

      {/* Analysis Popup */}
      {analysis && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-6"
          onClick={closeAnalysis}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-analysis-title"
            className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Fixed Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
              <div>
                <h2
                  id="resume-analysis-title"
                  className="text-xl font-bold text-slate-900"
                >
                  AI Resume Analysis
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your personalized resume feedback
                </p>
              </div>

              <button
                type="button"
                onClick={closeAnalysis}
                aria-label="Close resume analysis"
                className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-2xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                &times;
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7">
              <ResumeAnalysisResult analysis={analysis} />
            </div>

            {/* Fixed Footer */}
            <div className="shrink-0 border-t border-slate-200 bg-white px-5 py-4 text-right sm:px-7">
              <button
                type="button"
                onClick={closeAnalysis}
                className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
              >
                Close Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ResumeAnalyzer;
