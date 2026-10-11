import JobCard from "./JobCard";

const JobList = ({ jobs }) => {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
