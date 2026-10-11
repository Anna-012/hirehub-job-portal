import { BriefcaseBusiness } from "lucide-react";

const RegisterBranding = () => {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 px-8 py-8 lg:px-10">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
          <BriefcaseBusiness size={23} strokeWidth={2} />
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          Hire<span className="text-blue-600">Hub</span>
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col justify-center">
        <p className="mb-3 text-sm font-medium tracking-wide text-blue-600">
          YOUR CAREER STARTS HERE
        </p>

        <h2 className="text-4xl font-extrabold leading-tight text-slate-950">
          Start Your
          <span className="block text-blue-600">Career.</span>
        </h2>

        <p className="mt-4 max-w-xs text-base leading-6 text-slate-500">
          Build your career with HireHub.
        </p>

        {/* Illustration */}
        <div className="relative mt-10 flex h-60 items-center justify-center">
          {/* Background circle */}
          <div className="absolute h-48 w-48 rounded-full bg-blue-100" />

          {/* Decorative dots */}
          <div className="absolute left-[22%] top-[15%] h-3 w-3 rounded-full bg-blue-300" />

          <div className="absolute right-[22%] top-[8%] h-4 w-4 rounded-full bg-blue-500" />

          <div className="absolute bottom-[12%] right-[25%] h-3 w-3 rounded-full bg-blue-300" />

          {/* Main card */}
          <div className="relative z-10 flex h-36 w-36 items-center justify-center rounded-3xl bg-white shadow-lg">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50">
              <BriefcaseBusiness
                size={50}
                strokeWidth={1.6}
                className="text-blue-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-xs text-slate-400">HireHub</p>
    </div>
  );
};

export default RegisterBranding;
