import RegisterForm from "../components/forms/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-beige-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
