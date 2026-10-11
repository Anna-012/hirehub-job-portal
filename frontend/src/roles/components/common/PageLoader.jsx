import { LoaderCircle } from "lucide-react";

const PageLoader = ({
  message = "Loading, please wait...",
  fullScreen = false,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen ? "min-h-screen" : "min-h-[300px]"
      } bg-slate-50`}
      role="status"
      aria-live="polite"
    >
      <LoaderCircle
        size={36}
        className="animate-spin text-blue-600"
        aria-hidden="true"
      />

      <p className="text-sm font-medium text-slate-500">{message}</p>
    </div>
  );
};

export default PageLoader;
