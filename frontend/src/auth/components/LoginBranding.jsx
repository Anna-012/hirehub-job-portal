import { BriefcaseBusiness, CheckCircle2, Search, Users } from "lucide-react";

const LoginBranding = () => {
  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-50 px-10 py-10 md:flex md:flex-col">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
          <BriefcaseBusiness size={27} />
        </div>

        <span className="text-3xl font-bold tracking-tight text-slate-900">
          Hire<span className="text-blue-600">Hub</span>
        </span>
      </div>

      {/* Heading */}
      <div className="mt-16">
        <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
          Welcome Back!
        </p>

        <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-950">
          Login to Your
          <span className="block text-blue-600">Account.</span>
        </h1>

        <p className="mt-5 max-w-sm text-base leading-7 text-slate-500">
          Find your dream job or hire the best talent with HireHub.
        </p>
      </div>

      {/* Illustration */}
      <div className="relative mt-10 flex flex-1 items-center justify-center">
        {/* Background circle */}
        <div className="absolute h-64 w-64 rounded-full bg-blue-100/80" />

        {/* Main illustration card */}
        <div className="relative flex h-52 w-52 items-center justify-center rounded-3xl bg-white shadow-lg">
          <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-blue-50">
            <Users size={76} strokeWidth={1.4} className="text-blue-600" />
          </div>
        </div>

        {/* Search floating card */}
        <div className="absolute left-4 top-10 flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-md">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Search size={17} />
          </div>

          <span className="text-xs font-medium text-slate-700">Find Jobs</span>
        </div>

        {/* Opportunity floating card */}
        <div className="absolute bottom-8 right-2 flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-md">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-600">
            <CheckCircle2 size={17} />
          </div>

          <span className="text-xs font-medium text-slate-700">
            Opportunities
          </span>
        </div>

        {/* Decorative dots */}
        <span className="absolute left-16 top-24 h-3 w-3 rounded-full bg-blue-300" />
        <span className="absolute right-20 top-6 h-4 w-4 rounded-full bg-blue-500" />
        <span className="absolute bottom-12 left-24 h-3 w-3 rounded-full bg-blue-300" />
      </div>

      {/* Footer */}
      <p className="text-sm text-slate-400">
        Build your career with{" "}
        <span className="font-medium text-slate-500">HireHub</span>.
      </p>
    </div>
  );
};

export default LoginBranding;
