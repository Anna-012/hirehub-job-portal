import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerUser } from "../authApi";
import { registerSchema } from "../authValidation";

import RegisterBranding from "./RegisterBranding";
import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";
import RoleSelector from "./RoleSelector";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "jobseeker",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setSuccessMessage("");
      setServerError("");

      // confirmPassword is only required for frontend validation
      const { confirmPassword, ...userData } = data;

      const response = await registerUser(userData);

      setSuccessMessage(response?.message || "Registration successful!");

      // Clear inputs
      reset();

      // Navigate after showing success message
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Registration failed:", error);

      setServerError(
        error?.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="
        grid
        w-full
        max-w-[980px]
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-[0_15px_45px_rgba(15,23,42,0.10)]
        lg:h-[min(680px,calc(100vh-32px))]
        lg:grid-cols-[0.9fr_1.1fr]
      "
    >
      {/* LEFT SIDE */}
      <RegisterBranding />

      {/* RIGHT SIDE */}
      <div className="flex flex-col justify-center px-7 py-8 sm:px-10 lg:px-11 lg:py-8">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-[26px] font-bold tracking-tight text-slate-900">
            Register
          </h1>

          <p className="mt-1.5 text-sm text-slate-500">
            Get started with HireHub.
          </p>
        </div>

        {/* Success */}
        {successMessage && (
          <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-medium text-emerald-700">
            {successMessage}
          </div>
        )}

        {/* Server Error */}
        {serverError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-600">
            {serverError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
          {/* Full Name */}
          <FormInput
            type="text"
            placeholder="Full Name"
            icon="user"
            error={errors.name}
            registration={register("name")}
          />

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

          {/* Confirm Password */}
          <PasswordInput
            placeholder="Confirm Password"
            error={errors.confirmPassword}
            registration={register("confirmPassword")}
          />

          {/* Role */}
          <RoleSelector
            selectedRole={selectedRole}
            onSelect={(role) => {
              setValue("role", role, {
                shouldValidate: true,
              });
            }}
            error={errors.role}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="
              mt-1
              h-11
              w-full
              rounded-lg
              bg-blue-600
              text-sm
              font-semibold
              text-white
              transition
              duration-200
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login */}
        <p className="mt-4 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterForm;
