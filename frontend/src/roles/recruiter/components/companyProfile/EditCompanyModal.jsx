import { useEffect, useState } from "react";
import { X } from "lucide-react";

const EditCompanyModal = ({ isOpen, onClose, company, onSave, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    industry: "",
    companySize: "",
    location: "",
    foundedYear: "",
    logo: null,
    coverImage: null,
  });

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || "",
        description: company.description || "",
        website: company.website || "",
        industry: company.industry || "",
        companySize: company.companySize || "",
        location: company.location || "",
        foundedYear: company.foundedYear || "",
        logo: null,
        coverImage: null,
      });
    }
  }, [company]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Edit Company Profile
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <InputField
            label="Company Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Tell candidates about your company..."
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <InputField
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />

            <InputField
              label="Industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
            />

            <InputField
              label="Company Size"
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              placeholder="e.g. 51-200"
              required
            />

            <InputField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <InputField
              label="Founded Year"
              name="foundedYear"
              type="number"
              value={formData.foundedYear}
              onChange={handleChange}
            />
          </div>

          {/* Logo */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Company Logo
            </label>

            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className="block w-full rounded-lg border border-slate-300 p-2 text-sm"
            />
          </div>

          {/* Cover */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Cover Image
            </label>

            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleChange}
              className="block w-full rounded-lg border border-slate-300 p-2 text-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
};

export default EditCompanyModal;
