import { Plus, Trash2 } from "lucide-react";

const ExperienceForm = ({
  formData,
  setFormData,
  inputClass,
  textareaClass,
}) => {
  const updateExperience = (index, field, value) => {
    setFormData((current) => {
      const experience = [...current.experience];

      experience[index] = {
        ...experience[index],
        [field]: value,
      };

      return {
        ...current,
        experience,
      };
    });
  };

  const addExperience = () => {
    setFormData((current) => ({
      ...current,
      experience: [
        ...current.experience,
        {
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (index) => {
    setFormData((current) => ({
      ...current,
      experience: current.experience.filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    }));
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-slate-900">Experience</h2>

        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      <div className="mt-5 space-y-5">
        {formData.experience.length === 0 && (
          <p className="text-sm text-slate-500">
            No experience added. Click Add to add one.
          </p>
        )}

        {formData.experience.map((experience, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4"
          >
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600"
              >
                <Trash2 size={15} />
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">
                Job Title
                <input
                  value={experience.jobTitle}
                  onChange={(event) =>
                    updateExperience(index, "jobTitle", event.target.value)
                  }
                  placeholder="Frontend Developer"
                  className={inputClass}
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Company
                <input
                  value={experience.company}
                  onChange={(event) =>
                    updateExperience(index, "company", event.target.value)
                  }
                  placeholder="Company name"
                  className={inputClass}
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Start Date
                <input
                  value={experience.startDate}
                  onChange={(event) =>
                    updateExperience(index, "startDate", event.target.value)
                  }
                  placeholder="2025"
                  className={inputClass}
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                End Date
                <input
                  value={experience.endDate}
                  onChange={(event) =>
                    updateExperience(index, "endDate", event.target.value)
                  }
                  placeholder="2026"
                  disabled={experience.currentlyWorking}
                  className={`${inputClass} ${
                    experience.currentlyWorking
                      ? "cursor-not-allowed bg-slate-100"
                      : ""
                  }`}
                />
              </label>

              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 md:col-span-2">
                <input
                  type="checkbox"
                  checked={experience.currentlyWorking}
                  onChange={(event) =>
                    updateExperience(
                      index,
                      "currentlyWorking",
                      event.target.checked,
                    )
                  }
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                I currently work here
              </label>

              <label className="text-sm font-medium text-slate-700 md:col-span-2">
                Description
                <textarea
                  value={experience.description}
                  onChange={(event) =>
                    updateExperience(index, "description", event.target.value)
                  }
                  placeholder="Describe your responsibilities and achievements..."
                  className={textareaClass}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceForm;
