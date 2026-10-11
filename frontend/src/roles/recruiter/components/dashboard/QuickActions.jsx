import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: "＋",
      title: "Post a Job",
      description: "Create a new job opening",
      path: "/recruiter/post-job",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      icon: "▤",
      title: "Manage Jobs",
      description: "Edit and manage your listings",
      path: "/recruiter/manage-jobs",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: "♙",
      title: "View Applicants",
      description: "Review candidate applications",
      path: "/recruiter/applicants",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
        <p className="mt-1 text-sm text-slate-500">
          Everything you need to manage your hiring.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {actions.map((action) => (
          <button
            key={action.title}
            type="button"
            onClick={() => navigate(action.path)}
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
          >
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${action.color}`}
            >
              {action.icon}
            </span>

            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-slate-800">
                {action.title}
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">
                {action.description}
              </span>
            </span>

            <span className="text-xl text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600">
              →
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
