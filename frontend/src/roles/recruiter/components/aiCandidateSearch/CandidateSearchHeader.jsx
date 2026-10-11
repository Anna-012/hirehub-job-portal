const CandidateSearchHeader = () => {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-indigo-600">
        <span aria-hidden="true">✦</span>
        AI-powered recruitment
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
        AI Candidate Search
      </h1>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
        Discover relevant candidates by matching their skills and experience
        with your hiring requirements.
      </p>
    </div>
  );
};

export default CandidateSearchHeader;
