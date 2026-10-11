import React from "react";
import { FiSave, FiSend } from "react-icons/fi";

const FormActions = ({ onCancel, onSaveDraft, isSubmitting = false }) => {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
        className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
      >
        Cancel
      </button>

      <button
        type="button"
        onClick={onSaveDraft}
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-5 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-100 disabled:opacity-50"
      >
        <FiSave size={16} />
        Save as Draft
      </button>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FiSend size={16} />

        {isSubmitting ? "Publishing..." : "Post Job"}
      </button>
    </div>
  );
};

export default FormActions;
