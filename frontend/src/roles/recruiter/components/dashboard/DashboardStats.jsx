import { useNavigate } from "react-router-dom";
import StatCard from "./StatCard";

const DashboardStats = ({ stats }) => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Total Jobs",
      value: stats.totalJobs,
      icon: "💼",
      description: "All jobs posted",
      color: "blue",
      path: "/recruiter/manage-jobs",
    },
    {
      title: "Active Jobs",
      value: stats.activeJobs,
      icon: "📢",
      description: "Currently accepting applications",
      color: "green",
      path: "/recruiter/manage-jobs?status=active",
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      icon: "📄",
      description: "Applications received",
      color: "purple",
      path: "/recruiter/applicants",
    },
    {
      title: "Shortlisted",
      value: stats.shortlisted,
      icon: "⭐",
      description: "Candidates shortlisted",
      color: "orange",
      path: "/recruiter/applicants?status=Shortlisted",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          role="link"
          tabIndex={0}
          aria-label={`View ${card.title}`}
          onClick={() => navigate(card.path)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              navigate(card.path);
            }
          }}
          className="cursor-pointer rounded-2xl outline-none transition duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <StatCard {...card} />
        </div>
      ))}
    </section>
  );
};

export default DashboardStats;
