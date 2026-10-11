const ProfileFormActions = ({ saving }) => {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default ProfileFormActions;
