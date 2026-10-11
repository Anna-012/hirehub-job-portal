import { BriefcaseBusiness, UserRound } from "lucide-react";

const roles = [
  {
    value: "jobseeker",
    title: "Job Seeker",
    icon: UserRound,
  },
  {
    value: "recruiter",
    title: "Recruiter",
    icon: BriefcaseBusiness,
  },
];

const RoleSelector = ({ selectedRole, onSelect, error }) => {
  return (
    <div>
      <p className="mb-2.5 text-xs font-semibold text-slate-700">
        Select Your Role
      </p>

      <div className="flex gap-3">
        {roles.map((role) => {
          const Icon = role.icon;

          const isSelected = selectedRole === role.value;

          return (
            <button
              key={role.value}
              type="button"
              onClick={() => onSelect(role.value)}
              aria-pressed={isSelected}
              className={`
                flex
                aspect-square
                w-[92px]
                flex-col
                items-center
                justify-center
                rounded-xl
                border
                transition
                duration-200

                ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 text-blue-600 shadow-sm"
                    : "border-slate-200 bg-white text-slate-500 hover:border-blue-300 hover:bg-blue-50/40"
                }
              `}
            >
              <Icon size={22} />

              <span
                className={`
                  mt-2
                  text-[11px]
                  font-semibold

                  ${isSelected ? "text-blue-700" : "text-slate-600"}
                `}
              >
                {role.title}
              </span>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mt-1 text-[11px] text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default RoleSelector;
