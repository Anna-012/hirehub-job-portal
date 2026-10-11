import { useRef, useState } from "react";
import { ExternalLink, FileText, Upload } from "lucide-react";

const ResumeUpload = ({
  currentResume,
  onFileSelect,
  selectedFile,
  buttonText = "Upload Resume",
  disabled = false,
}) => {
  const resumeInputRef = useRef(null);

  const [resumeError, setResumeError] = useState("");

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setResumeError("");

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setResumeError("Only PDF, DOC and DOCX files are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setResumeError("Resume must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    onFileSelect(file);

    // Allows selecting the same file again
    event.target.value = "";
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">Resume</h2>

      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
        {selectedFile ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <FileText size={20} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">
                  {selectedFile.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">Resume selected</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => resumeInputRef.current?.click()}
              disabled={disabled}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Upload size={16} />

              {buttonText}
            </button>
          </div>
        ) : currentResume?.url ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <FileText size={20} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">
                  Resume uploaded
                </p>

                <a
                  href={currentResume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  View Resume
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => resumeInputRef.current?.click()}
              disabled={disabled}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Upload size={16} />
              {buttonText}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                No resume uploaded
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Upload your resume in PDF, DOC or DOCX format. Maximum size 5
                MB.
              </p>
            </div>

            <button
              type="button"
              onClick={() => resumeInputRef.current?.click()}
              disabled={disabled}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Upload size={16} />
              {buttonText}
            </button>
          </div>
        )}

        <input
          ref={resumeInputRef}
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleResumeChange}
          className="hidden"
        />

        {resumeError && (
          <p className="mt-3 text-sm text-red-600">{resumeError}</p>
        )}
      </div>
    </section>
  );
};

export default ResumeUpload;
