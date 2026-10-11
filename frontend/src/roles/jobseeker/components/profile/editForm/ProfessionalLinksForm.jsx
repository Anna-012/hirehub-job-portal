const ProfessionalLinksForm = ({ formData, setFormData, inputClass }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">Professional Links</h2>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <label className="text-sm font-medium text-slate-700">
          LinkedIn
          <input
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/..."
            className={inputClass}
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          GitHub
          <input
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className={inputClass}
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Portfolio
          <input
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            placeholder="https://yourportfolio.com"
            className={inputClass}
          />
        </label>
      </div>
    </section>
  );
};

export default ProfessionalLinksForm;
