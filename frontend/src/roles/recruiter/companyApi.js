import api from "../../services/api";

// Get my company
export const getMyCompany = async () => {
  const response = await api.get("/company");

  return response.data;
};

// Create / update company
export const saveCompany = async (companyData) => {
  const formData = new FormData();

  formData.append("name", companyData.name);
  formData.append("description", companyData.description);
  formData.append("website", companyData.website);
  formData.append("industry", companyData.industry);
  formData.append("companySize", companyData.companySize);
  formData.append("location", companyData.location);
  formData.append("foundedYear", companyData.foundedYear);

  if (companyData.logo instanceof File) {
    formData.append("logo", companyData.logo);
  }

  if (companyData.coverImage instanceof File) {
    formData.append("coverImage", companyData.coverImage);
  }

  const response = await api.put("/company", formData);

  return response.data;
};

// Delete company
export const deleteCompany = async () => {
  const response = await api.delete("/company");

  return response.data;
};
