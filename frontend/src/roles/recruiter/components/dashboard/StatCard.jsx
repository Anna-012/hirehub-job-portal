const StatCard = ({ title, value, icon, description, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-6">
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${
          colors[color] || colors.blue
        }`}
      >
        {icon}
      </div>

      <p className="text-sm font-medium text-slate-500">{title}</p>

      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </h2>

      <p className="mt-2 text-xs leading-5 text-slate-400">{description}</p>
    </article>
  );
};

export default StatCard;
