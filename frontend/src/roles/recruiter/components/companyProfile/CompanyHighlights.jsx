import { CalendarDays, MapPin, Users } from "lucide-react";

const CompanyHighlights = ({ company }) => {
  const highlights = [
    {
      label: "Company Size",
      value: company?.companySize || "Not provided",
      icon: Users,
    },
    {
      label: "Location",
      value: company?.location || "Not provided",
      icon: MapPin,
    },
    {
      label: "Founded",
      value: company?.foundedYear || "Not provided",
      icon: CalendarDays,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-slate-900">
        Company Highlights
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {highlights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-xl border border-slate-100 bg-slate-50 p-5"
            >
              <Icon className="mb-3 text-blue-600" size={24} />

              <p className="text-xl font-bold text-slate-900">{item.value}</p>

              <p className="mt-1 text-sm text-slate-500">{item.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyHighlights;
