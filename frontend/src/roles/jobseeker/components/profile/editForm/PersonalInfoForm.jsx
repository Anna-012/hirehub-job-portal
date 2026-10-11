const PersonalInfoForm = ({ formData, setFormData, inputClass }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">Personal Information</h2>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Full Name
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Email
          <input
            value={formData.email}
            disabled
            className={`${inputClass} cursor-not-allowed bg-slate-50 text-slate-400`}
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Phone
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className={inputClass}
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Location
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Mumbai, India"
            className={inputClass}
          />
        </label>
      </div>
    </section>
  );
};

export default PersonalInfoForm;
