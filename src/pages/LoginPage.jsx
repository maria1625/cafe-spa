import LoginForm from "../components/forms/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-[#D7CCC8]">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
