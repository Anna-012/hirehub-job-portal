import { useState } from "react";
import { analyzeResume } from "../../../aiApi";

import JobMatchSelector from "./JobMatchSelector";
import MatchScore from "./MatchScore";
import AnalysisSection from "./AnalysisSection";

const JobMatchAnalyzer = () => {
  const [selectedJob, setSelectedJob] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [analyzedJob, setAnalyzedJob] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!selectedJob) {
      setError("Please select a job first.");
      return;
    }

    try {
      setAnalyzing(true);
      setError("");
      setAnalysis(null);
      setAnalyzedJob(null);

      const response = await analyzeResume(selectedJob);

      setAnalysis(response.analysis);
      setAnalyzedJob(response.job);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to analyze your profile right now.",
      );
    } finally {
      setAnalyzing(false);
    }
  };

  const handleJobChange = (jobId) => {
    setSelectedJob(jobId);
    setAnalysis(null);
    setAnalyzedJob(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      <JobMatchSelector
        selectedJob={selectedJob}
        onJobChange={handleJobChange}
        onAnalyze={handleAnalyze}
        analyzing={analyzing}
      />

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {analysis && (
        <>
          <MatchScore
            score={analysis.matchScore}
            jobTitle={analyzedJob?.title}
          />

          <AnalysisSection analysis={analysis} />
        </>
      )}
    </div>
  );
};

export default JobMatchAnalyzer;
