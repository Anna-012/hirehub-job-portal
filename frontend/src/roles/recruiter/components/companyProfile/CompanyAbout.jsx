import { Pencil } from "lucide-react";

const CompanyAbout = ({ company, onEdit }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">About Company</h2>

        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <Pencil size={15} />
          Edit
        </button>
      </div>

      <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
        {company?.description || "No company description added yet."}
      </p>
    </div>
  );
};

export default CompanyAbout;
