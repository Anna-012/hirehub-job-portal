import SavedJobCard from "./SavedJobCard";

const SavedJobList = ({
  savedJobs,
  onRemove,
  removingId,
  hasFilters = false,
}) => {
  if (!savedJobs || savedJobs.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          {hasFilters ? "No matching saved jobs" : "No saved jobs yet"}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {hasFilters
            ? "Try changing your search."
            : "Jobs you save will appear here."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      {savedJobs.map((savedJob) => (
        <SavedJobCard
          key={savedJob._id}
          savedJob={savedJob}
          onRemove={onRemove}
          removing={removingId === savedJob._id}
        />
      ))}
    </div>
  );
};

export default SavedJobList;
