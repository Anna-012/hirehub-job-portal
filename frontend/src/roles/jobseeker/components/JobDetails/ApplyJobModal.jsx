import { useRef, useState } from "react";
import { X, LoaderCircle, CheckCircle2 } from "lucide-react";

import { applyForJob } from "../../jobseekerApi";
import ResumeUpload from "../common/ResumeUpload";

const ApplyJobModal = ({ job, onClose, onSuccess }) => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Prevent duplicate requests, even before React re-renders.
  const submittingRef = useRef(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submittingRef.current || success) return;

    if (!resume) {
      setError("Please select your resume.");
      return;
    }

    try {
      submittingRef.current = true;
      setSubmitting(true);
      setError("");
      setSuccess("");

      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("coverLetter", coverLetter);

      const response = await applyForJob(job._id, formData);

      setSuccess(response?.message || "Application submitted successfully.");

      // Allow the user to read the success message.
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } catch (err) {
      console.error("Failed to apply for job:", err);

      setError(
        err.response?.data?.message ||
          "Failed to submit application. Please try again.",
      );

      submittingRef.current = false;
    } finally {
      setSubmitting(false);
    }
  };

  const isLocked = submitting || Boolean(success);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2
              id="apply-modal-title"
              className="text-lg font-semibold text-slate-900"
            >
              Apply for this job
            </h2>

            <p className="mt-1 text-sm text-slate-500">{job.title}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLocked}
            aria-label="Close application form"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          {/* Resume */}
          <ResumeUpload
            selectedFile={resume}
            onFileSelect={(file) => {
              setResume(file);
              setError("");
            }}
            buttonText="Select Resume"
            disabled={isLocked}
          />

          {/* Cover Letter */}
          <div>
            <label
              htmlFor="coverLetter"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Cover Letter
            </label>

            <textarea
              id="coverLetter"
              value={coverLetter}
              onChange={(event) => {
                setCoverLetter(event.target.value);
                setError("");
              }}
              disabled={isLocked}
              rows={6}
              maxLength={5000}
              placeholder="Tell the recruiter why you are a good fit for this role..."
              className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
            />

            <p className="mt-1 text-right text-xs text-slate-400">
              {coverLetter.length}/5000
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              <CheckCircle2 size={18} className="shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={isLocked}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLocked}
              aria-busy={submitting}
              className="inline-flex min-w-44 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <LoaderCircle
                    size={17}
                    className="animate-spin"
                    aria-hidden="true"
                  />
                  Submitting...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 size={17} aria-hidden="true" />
                  Submitted
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobModal;
