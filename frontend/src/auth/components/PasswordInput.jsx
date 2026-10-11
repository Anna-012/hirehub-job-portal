import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

const PasswordInput = ({ placeholder, error, registration }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="relative">
        {/* Lock icon */}
        <LockKeyhole
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        {/* Input */}
        <input
          type={showPassword ? "text" : "password"}
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
            pr-10
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

        {/* Show / Hide */}
        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword((previous) => !previous)}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-slate-400
            transition
            hover:text-slate-600
          "
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {error && (
        <p className="mt-1 text-[11px] text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default PasswordInput;
