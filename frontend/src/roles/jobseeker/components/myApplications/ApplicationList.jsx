import ApplicationCard from "./ApplicationCard";

const ApplicationList = ({ applications }) => {
  if (!applications || applications.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          No applications yet
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Jobs you apply for will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <ApplicationCard key={application._id} application={application} />
      ))}
    </div>
  );
};

export default ApplicationList;
