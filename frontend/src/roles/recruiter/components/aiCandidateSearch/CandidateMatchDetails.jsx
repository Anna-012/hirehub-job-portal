const CandidateMatchDetails = ({ candidate }) => {
  const matchedSkills = candidate.matchedSkills || [];
  const missingSkills = candidate.missingSkills || [];

  return (
    <div className="mt-5 space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-semibold text-green-700">
          Matched skills
        </h4>

        <div className="flex flex-wrap gap-2">
          {matchedSkills.length > 0 ? (
            matchedSkills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="rounded-md bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-500">
              No matched skills specified
            </span>
          )}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-orange-700">
          Missing skills
        </h4>

        <div className="flex flex-wrap gap-2">
          {missingSkills.length > 0 ? (
            missingSkills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="rounded-md bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-500">
              No missing skills specified
            </span>
          )}
        </div>
      </div>

      {candidate.reason && (
        <div className="rounded-xl bg-slate-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-slate-800">
            Why this candidate matches
          </h4>

          <p className="text-sm leading-6 text-slate-600">{candidate.reason}</p>
        </div>
      )}
    </div>
  );
};

export default CandidateMatchDetails;
