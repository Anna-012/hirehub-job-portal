import { BrainCircuit } from "lucide-react";

import JobMatchAnalyzer from "../components/AI-components/JobMatchAnalyzer/JobMatchAnalyzer";
import ResumeAnalyzer from "../components/AI-components/ResumeAnalyzer/ResumeAnalyzer";

const AITools = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BrainCircuit size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                AI Tools
              </h1>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Analyze your job match and improve your resume with AI.
              </p>
            </div>
          </div>
        </div>

        {/* AI Tools */}
        <div className="space-y-6">
          <JobMatchAnalyzer />
          <ResumeAnalyzer />
        </div>
      </div>
    </div>
  );
};

export default AITools;
