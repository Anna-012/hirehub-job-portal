import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

// Auth
import Register from "./auth/pages/Register";
import Login from "./auth/pages/Login";
import ResetPassword from "./auth/pages/ResetPassword";
import ForgotPassword from "./auth/pages/ForgotPassword";

// Common
import RecruiterLayout from "./layouts/RecruiterLayout";
import JobseekerLayout from "./layouts/JobseekerLayout";

// Recruiter pages
import PostJob from "./roles/recruiter/pages/PostJob";
import ManageJobs from "./roles/recruiter/pages/ManageJobs";
import EditJob from "./roles/recruiter/pages/EditJob";
import CompanyProfile from "./roles/recruiter/pages/CompanyProfile";
import Applicants from "./roles/recruiter/pages/Applicants";
import AllApplicants from "./roles/recruiter/pages/AllApplicants";
import RecruiterDashboard from "./roles/recruiter/pages/Dashboard";
import AICandidateSearch from "./roles/recruiter/pages/AICandidateSearch";

// Jobseeker pages
import JobseekerDashboard from "./roles/jobseeker/pages/Dashboard";
import JobDetails from "./roles/jobseeker/pages/JobDetails";
import FindJobs from "./roles/jobseeker/pages/FindJobs";
import MyApplications from "./roles/jobseeker/pages/MyApplications";
import SavedJobs from "./roles/jobseeker/pages/SavedJobs";
import Profile from "./roles/jobseeker/pages/Profile";
import AITools from "./roles/jobseeker/pages/AITools";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Recruiter routes */}
          <Route path="/recruiter" element={<RecruiterLayout />}>
            <Route index element={<RecruiterDashboard />} />
            <Route path="dashboard" element={<RecruiterDashboard />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="manage-jobs" element={<ManageJobs />} />
            <Route path="edit-job/:id" element={<EditJob />} />
            <Route path="company" element={<CompanyProfile />} />
            <Route path="applicants" element={<AllApplicants />} />
            <Route path="jobs/:jobId/applicants" element={<Applicants />} />
            <Route path="ai-candidate-search" element={<AICandidateSearch />} />
          </Route>

          {/* Jobseeker routes */}
          <Route path="/jobseeker" element={<JobseekerLayout />}>
            <Route index element={<JobseekerDashboard />} />
            <Route path="dashboard" element={<JobseekerDashboard />} />
            <Route path="home" element={<JobseekerDashboard />} />
            <Route path="jobs" element={<FindJobs />} />
            <Route path="jobs/:id" element={<JobDetails />} />
            <Route path="applications" element={<MyApplications />} />
            <Route path="saved-jobs" element={<SavedJobs />} />
            <Route path="profile" element={<Profile />} />
            <Route path="ai-tools" element={<AITools />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
