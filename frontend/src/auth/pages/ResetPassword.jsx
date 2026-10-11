import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LockKeyhole } from "lucide-react";

import PasswordInput from "../components/PasswordInput";
import { resetPassword } from "../authApi";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await resetPassword(token, password);

      setMessage(response.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to reset password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white">
            <LockKeyhole size={22} />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">Reset Password</h1>

          <p className="mt-2 text-sm text-slate-500">
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordInput
            placeholder="New Password"
            registration={{
              value: password,
              onChange: (event) => setPassword(event.target.value),
            }}
          />

          <PasswordInput
            placeholder="Confirm Password"
            registration={{
              value: confirmPassword,
              onChange: (event) => setConfirmPassword(event.target.value),
            }}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          {message && <p className="text-sm text-green-600">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
