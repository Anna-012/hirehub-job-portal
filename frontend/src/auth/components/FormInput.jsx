import { Mail, UserRound } from "lucide-react";

const FormInput = ({
  type = "text",
  placeholder,
  icon,
  error,
  registration,
}) => {
  const Icon = icon === "email" ? Mail : UserRound;

  return (
    <div>
      <div className="relative">
        <Icon
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type={type}
          placeholder={placeholder}
          aria-label={placeholder}
          {...registration}
          className={`
            h-11
            w-full
            rounded-lg
            border
            bg-white
            pl-9
            pr-3
            text-sm
            text-slate-800
            outline-none
            transition

            placeholder:text-slate-400

            ${
              error
                ? "border-red-400 focus:border-red-500"
                : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
            }
          `}
        />
      </div>

      {error && (
        <p className="mt-1 text-[11px] text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default FormInput;
