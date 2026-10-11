import LoginBranding from "../components/LoginBranding";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-3">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:h-[calc(100vh-1.5rem)] md:grid-cols-2">
        <LoginBranding />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
