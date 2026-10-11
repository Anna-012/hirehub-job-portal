import { Plus, Trash2 } from "lucide-react";

const EducationForm = ({ formData, setFormData, inputClass }) => {
  const updateEducation = (index, field, value) => {
    setFormData((current) => {
      const education = [...current.education];

      education[index] = {
        ...education[index],
        [field]: value,
      };

      return {
        ...current,
        education,
      };
    });
  };

  const addEducation = () => {
    setFormData((current) => ({
      ...current,
      education: [
        ...current.education,
        {
          degree: "",
          subjects: "",
          institution: "",
          startYear: "",
          endYear: "",
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    setFormData((current) => ({
      ...current,
      education: current.education.filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    }));
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-slate-900">Education</h2>

        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {/* Education List */}
      <div className="mt-5 space-y-5">
        {formData.education.length === 0 && (
          <p className="text-sm text-slate-500">
            No education added. Click Add to add one.
          </p>
        )}

        {formData.education.map((education, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-200 bg-slate-50 p-5"
          >
            {/* Remove Button */}
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 transition hover:text-red-700"
              >
                <Trash2 size={15} />
                Remove
              </button>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Degree */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Degree
                </span>

                <input
                  type="text"
                  value={education.degree || ""}
                  onChange={(event) =>
                    updateEducation(index, "degree", event.target.value)
                  }
                  placeholder="B.Sc"
                  className={inputClass}
                />
              </label>

              {/* Subjects */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Subjects
                </span>

                <input
                  type="text"
                  value={
                    Array.isArray(education.subjects)
                      ? education.subjects.join(", ")
                      : education.subjects || ""
                  }
                  onChange={(event) =>
                    updateEducation(index, "subjects", event.target.value)
                  }
                  placeholder="Physics, Mathematics, Chemistry"
                  className={inputClass}
                />

                <p className="mt-1 text-xs text-slate-400">
                  Separate multiple subjects with commas.
                </p>
              </label>

              {/* Institution */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Institution
                </span>

                <input
                  type="text"
                  value={education.institution || ""}
                  onChange={(event) =>
                    updateEducation(index, "institution", event.target.value)
                  }
                  placeholder="Kumaun University"
                  className={inputClass}
                />
              </label>

              {/* Start Year */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Start Year
                </span>

                <input
                  type="text"
                  value={education.startYear || ""}
                  onChange={(event) =>
                    updateEducation(index, "startYear", event.target.value)
                  }
                  placeholder="2018"
                  className={inputClass}
                />
              </label>

              {/* End Year */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  End Year
                </span>

                <input
                  type="text"
                  value={education.endYear || ""}
                  onChange={(event) =>
                    updateEducation(index, "endYear", event.target.value)
                  }
                  placeholder="2022"
                  className={inputClass}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationForm;
