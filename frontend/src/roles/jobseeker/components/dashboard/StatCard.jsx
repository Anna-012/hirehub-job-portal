const StatCard = ({ title, value, description, icon: Icon, color }) => {
  return (
    <div className="group h-full cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:border-blue-300 group-hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>

          <p className="mt-2 text-xs leading-5 text-slate-500">{description}</p>
        </div>

        <div
          className={`shrink-0 rounded-xl p-3 ${color} transition-transform duration-200 group-hover:scale-110`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
