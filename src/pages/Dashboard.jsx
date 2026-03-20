import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setError(null);

    await new Promise((res) => setTimeout(res, 1000));

    const success = login(data);

    if (success) {
      navigate("/dashboard");
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-[#6b4f4f]">
        Iniciar Sesión
      </h2>

      <input
        type="email"
        placeholder="Correo"
        {...register("email", { required: true })}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b4f4f]"
      />

      <input
        type="password"
        placeholder="Contraseña"
        {...register("password", { required: true })}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b4f4f]"
      />

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#6b4f4f] text-white py-2 rounded-lg hover:bg-[#5a3f3f] transition"
      >
        {isSubmitting ? "Cargando..." : "Ingresar"}
      </button>
    </form>
  );
};

export default LoginForm;