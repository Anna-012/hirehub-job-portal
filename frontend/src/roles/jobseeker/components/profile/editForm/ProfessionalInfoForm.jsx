import { useState } from "react";

const ProfessionalInfoForm = ({
  formData,
  setFormData,
  inputClass,
  textareaClass,
}) => {
  const [skillsInput, setSkillsInput] = useState(
    (formData.skills || []).join(", "),
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSkillChange = (event) => {
    const value = event.target.value;

    // Preserve commas and spaces while typing
    setSkillsInput(value);

    // Update skills array for saving
    const skills = value
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    setFormData((current) => ({
      ...current,
      skills,
    }));
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">
        Professional Information
      </h2>

      <div className="mt-5 space-y-5">
        <label className="block text-sm font-medium text-slate-700">
          Professional Headline
          <input
            type="text"
            name="headline"
            value={formData.headline || ""}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            className={inputClass}
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          About
          <textarea
            name="bio"
            value={formData.bio || ""}
            onChange={handleChange}
            placeholder="Tell employers about yourself..."
            className={textareaClass}
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Skills
          <input
            type="text"
            name="skills"
            value={skillsInput}
            onChange={handleSkillChange}
            placeholder="React, JavaScript, Node.js, MongoDB"
            className={inputClass}
          />
          <p className="mt-1.5 text-xs text-slate-400">
            Separate skills with commas.
          </p>
        </label>
      </div>
    </section>
  );
};

export default ProfessionalInfoForm;
