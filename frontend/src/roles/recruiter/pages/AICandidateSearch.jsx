import { useEffect, useState } from "react";

import { getMyJobs, searchCandidatesWithAI } from "../recruiterApi";

import CandidateSearchHeader from "../components/aiCandidateSearch/CandidateSearchHeader";
import CandidateSearchForm from "../components/aiCandidateSearch/CandidateSearchForm";
import CandidateResults from "../components/aiCandidateSearch/CandidateResults";
import AICandidateSearchLoader from "../components/aiCandidateSearch/AICandidateSearchLoader";

const AICandidateSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [prompt, setPrompt] = useState("");

  const [searchMode, setSearchMode] = useState("job");
  const [candidates, setCandidates] = useState([]);

  const [loadingJobs, setLoadingJobs] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  // LOAD RECRUITER JOBS
  useEffect(() => {
    let isMounted = true;

    const loadJobs = async () => {
      try {
        const response = await getMyJobs();

        const jobsData = Array.isArray(response)
          ? response
          : response?.jobs || response?.data?.jobs || [];

        if (isMounted) {
          setJobs(jobsData);
        }
      } catch (err) {
        console.error("Failed to load recruiter jobs:", err);

        if (isMounted) {
          setError(err.response?.data?.message || "Unable to load your jobs.");
        }
      } finally {
        if (isMounted) {
          setLoadingJobs(false);
        }
      }
    };

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  // SEARCH CANDIDATES WITH AI
  const handleSearch = async (event) => {
    event.preventDefault();

    setError("");

    if (searchMode === "job" && !selectedJob) {
      setError("Please select an active job.");
      return;
    }

    if (searchMode === "custom" && !prompt.trim()) {
      setError("Please describe the candidate you are looking for.");
      return;
    }

    setSearching(true);
    setSearched(false);
    setCandidates([]);

    try {
      const payload =
        searchMode === "job"
          ? { jobId: selectedJob }
          : { prompt: prompt.trim() };

      const response = await searchCandidatesWithAI(payload);

      setCandidates(
        Array.isArray(response?.candidates) ? response.candidates : [],
      );

      setSearched(true);
    } catch (err) {
      console.error("AI candidate search error:", err);

      setError(
        err.response?.data?.message ||
          "Candidate search failed. Please try again.",
      );
    } finally {
      setSearching(false);
    }
  };

  // INITIAL PAGE LOADING
  if (loadingJobs) {
    return <AICandidateSearchLoader />;
  }

  return (
    <div className="min-h-full w-full bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-7">
        <CandidateSearchHeader />

        <CandidateSearchForm
          jobs={jobs}
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
          prompt={prompt}
          setPrompt={setPrompt}
          searchMode={searchMode}
          setSearchMode={setSearchMode}
          loadingJobs={loadingJobs}
          searching={searching}
          error={error}
          onSearch={handleSearch}
        />

        {/* AI Search Progress */}
        {searching && (
          <div
            role="status"
            aria-live="polite"
            className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700"
          >
            <svg
              className="mt-0.5 h-5 w-5 shrink-0 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="3"
                className="opacity-25"
              />
              <path
                d="M21 12a9 9 0 0 0-9-9"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="opacity-90"
              />
            </svg>

            <div>
              <p className="font-semibold">Finding matching candidates</p>
              <p className="mt-1 text-blue-600">
                AI is analysing candidate profiles. This may take a few
                seconds...
              </p>
            </div>
          </div>
        )}

        {/* Candidate Results */}
        <CandidateResults candidates={candidates} searched={searched} />
      </div>
    </div>
  );
};

export default AICandidateSearch;
