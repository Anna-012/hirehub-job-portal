import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <main className="min-h-screen bg-slate-50 lg:h-screen lg:overflow-hidden">
      <div className="flex min-h-screen items-center justify-center p-4 lg:h-screen lg:min-h-0">
        <RegisterForm />
      </div>
    </main>
  );
};

export default Register;
