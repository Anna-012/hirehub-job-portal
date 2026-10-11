import { Users, Clock3, UserCheck, UserX } from "lucide-react";

const AllApplicantsStats = ({ counts = {} }) => {
  const stats = [
    {
      label: "Total Applicants",
      value: counts.total ?? 0,
      icon: Users,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      label: "Under Review",
      value: (counts.applied || 0) + (counts.viewed || 0),
      icon: Clock3,
      bg: "bg-amber-50",
      color: "text-amber-600",
    },
    {
      label: "Shortlisted",
      value: counts.shortlisted ?? 0,
      icon: UserCheck,
      bg: "bg-emerald-50",
      color: "text-emerald-600",
    },
    {
      label: "Rejected",
      value: counts.rejected ?? 0,
      icon: UserX,
      bg: "bg-red-50",
      color: "text-red-600",
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
            >
              <Icon size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {stat.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllApplicantsStats;
