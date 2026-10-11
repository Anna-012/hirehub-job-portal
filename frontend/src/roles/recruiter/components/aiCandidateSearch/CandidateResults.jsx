import CandidateResultCard from "./CandidateResultCard";

const CandidateResults = ({ candidates, searched }) => {
  if (!searched) return null;

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Candidate Results</h2>

        <p className="mt-1 text-sm text-slate-500">
          {candidates.length} candidates returned
        </p>
      </div>

      {candidates.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-500">
            ?
          </div>

          <h3 className="mt-4 font-semibold text-slate-800">
            No matching candidates found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try different search criteria. Candidates with incomplete profiles
            may also be relevant.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {candidates.map((candidate) => (
            <CandidateResultCard
              key={candidate.candidateId}
              candidate={candidate}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CandidateResults;
