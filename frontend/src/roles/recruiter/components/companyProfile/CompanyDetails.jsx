import {
  Building2,
  CalendarDays,
  Globe,
  MapPin,
  Users,
  Pencil,
} from "lucide-react";

const CompanyDetails = ({ company, onEdit }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Company Details
        </h2>

        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <Pencil size={15} />
          Edit
        </button>
      </div>

      <div className="space-y-5">
        <DetailRow
          icon={<Building2 size={18} />}
          label="Industry"
          value={company?.industry}
        />

        <DetailRow
          icon={<Users size={18} />}
          label="Company Size"
          value={company?.companySize}
        />

        <DetailRow
          icon={<MapPin size={18} />}
          label="Location"
          value={company?.location}
        />

        <DetailRow
          icon={<Globe size={18} />}
          label="Website"
          value={company?.website}
          isLink
        />

        <DetailRow
          icon={<CalendarDays size={18} />}
          label="Founded"
          value={company?.foundedYear}
        />
      </div>
    </div>
  );
};

const DetailRow = ({ icon, label, value, isLink }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-slate-400">{icon}</div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>

        {isLink && value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-sm font-medium text-blue-600 hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="mt-1 text-sm font-medium text-slate-700">
            {value || "Not provided"}
          </p>
        )}
      </div>
    </div>
  );
};

export default CompanyDetails;
