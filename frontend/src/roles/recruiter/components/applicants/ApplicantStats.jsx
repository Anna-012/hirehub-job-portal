import { Users, Eye, CheckCircle2, XCircle } from "lucide-react";

const ApplicantStats = ({ counts = {} }) => {
  const stats = [
    {
      label: "Total Applicants",
      value: counts.total ?? 0,
      icon: Users,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      label: "Under Review",
      value: (counts.applied ?? 0) + (counts.viewed ?? 0),
      icon: Eye,
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      label: "Shortlisted",
      value: counts.shortlisted ?? 0,
      icon: CheckCircle2,
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Rejected",
      value: counts.rejected ?? 0,
      icon: XCircle,
      iconStyle: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, icon: Icon, iconStyle }) => (
        <div
          key={label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-500">{label}</p>

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconStyle}`}
            >
              <Icon size={20} />
            </div>
          </div>

          <p className="mt-4 text-3xl font-bold text-slate-900">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default ApplicantStats;
