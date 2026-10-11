const statusStyles = {
  Applied: "bg-amber-50 text-amber-700",
  Viewed: "bg-blue-50 text-blue-700",
  Shortlisted: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-red-50 text-red-700",
  Hired: "bg-purple-50 text-purple-700",
  Withdrawn: "bg-slate-100 text-slate-600",
};

const ApplicantStatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
        statusStyles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status || "Applied"}
    </span>
  );
};

export default ApplicantStatusBadge;
