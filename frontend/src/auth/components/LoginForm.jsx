import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../authValidation";

import { useAuth } from "../../context/AuthContext";

import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";

const LoginForm = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      setServerError("");

      const data = await login(formData);

      const role = data.user?.role;

      if (role === "recruiter") {
        navigate("/recruiter");
      } else if (role === "jobseeker") {
        navigate("/jobseeker");
      } else if (role === "admin") {
        navigate("/admin");
      } else {
        setServerError("Invalid user role. Please contact support.");
      }
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          "Login failed. Please check your email and password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white px-6 py-10 sm:px-10 lg:px-14">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            Login
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Enter your email and password to access your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <FormInput
            type="email"
            placeholder="Email Address"
            icon="email"
            error={errors.email}
            registration={register("email")}
          />

          {/* Password */}
          <PasswordInput
            placeholder="Password"
            error={errors.password}
            registration={register("password")}
          />

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />

              <span>Remember me</span>
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-[#2161ff] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Server Error */}
          {serverError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
              <p className="text-xs text-red-600">{serverError}</p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              mt-2
              h-11
              w-full
              rounded-lg
              bg-blue-600
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-blue-700
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-2">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs text-slate-400">OR</span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Register */}
          <p className="pt-3 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
