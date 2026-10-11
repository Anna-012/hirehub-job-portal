import PersonalInfoForm from "./editForm/PersonalInfoForm";
import ProfessionalInfoForm from "./editForm/ProfessionalInfoForm";
import EducationForm from "./editForm/EducationForm";
import ExperienceForm from "./editForm/ExperienceForm";
import ProfessionalLinksForm from "./editForm/ProfessionalLinksForm";
import ProfileFormActions from "./editForm/ProfileFormActions";

import ResumeUpload from "../common/ResumeUpload";

import { uploadResume } from "../../jobseekerApi";

const ProfileEditForm = ({
  formData,
  setFormData,
  onSave,
  saving,
  onResumeUpdated,
}) => {
  const inputClass =
    "mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const textareaClass =
    "mt-1.5 min-h-28 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const handleResumeSelect = async (file) => {
    try {
      const data = await uploadResume(file);

      setFormData((current) => ({
        ...current,
        resume: data.user.resume,
      }));

      if (onResumeUpdated) {
        onResumeUpdated(data.user);
      }
    } catch (error) {
      console.error("Failed to upload resume:", error);

      throw error;
    }
  };

  return (
    <form onSubmit={onSave} className="space-y-5">
      <PersonalInfoForm
        formData={formData}
        setFormData={setFormData}
        inputClass={inputClass}
      />

      <ProfessionalInfoForm
        formData={formData}
        setFormData={setFormData}
        inputClass={inputClass}
        textareaClass={textareaClass}
      />

      <ResumeUpload
        currentResume={formData.resume}
        onFileSelect={handleResumeSelect}
        buttonText="Upload Resume"
      />

      <EducationForm
        formData={formData}
        setFormData={setFormData}
        inputClass={inputClass}
      />

      <ExperienceForm
        formData={formData}
        setFormData={setFormData}
        inputClass={inputClass}
        textareaClass={textareaClass}
      />

      <ProfessionalLinksForm
        formData={formData}
        setFormData={setFormData}
        inputClass={inputClass}
      />

      <ProfileFormActions saving={saving} />
    </form>
  );
};

export default ProfileEditForm;
