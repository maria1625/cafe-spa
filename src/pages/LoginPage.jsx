import LoginForm from "../components/forms/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-beige-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;