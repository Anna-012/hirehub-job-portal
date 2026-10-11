import { LoaderCircle } from "lucide-react";

const LoadingButton = ({
  children,
  loading = false,
  loadingText = "Please wait...",
  disabled = false,
  type = "button",
  onClick,
  className = "",
}) => {
  const isDisabled = loading || disabled;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      className={`inline-flex items-center justify-center gap-2
        rounded-lg px-4 py-2.5 font-semibold
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500
        focus:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-60
        ${className}`}
    >
      {loading && (
        <LoaderCircle
          size={18}
          className="shrink-0 animate-spin"
          aria-hidden="true"
        />
      )}

      <span>{loading ? loadingText : children}</span>
    </button>
  );
};

export default LoadingButton;
