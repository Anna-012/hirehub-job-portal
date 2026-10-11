import { useAuth } from "../../../../context/AuthContext";

const WelcomeSection = () => {
  const { user } = useAuth();

  const name =
    (user?.name || "Recruiter").trim().split(/\s+/)[0].charAt(0).toUpperCase() +
    (user?.name || "Recruiter").trim().split(/\s+/)[0].slice(1).toLowerCase();

  return (
    <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-indigo-600">
          Recruiter Workspace
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Welcome back, {name}!
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Here is what's happening with your hiring activities today.
        </p>
      </div>

      <div className="flex w-fit items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
        <span className="text-lg">📅</span>
        <span>
          {new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </section>
  );
};

export default WelcomeSection;
