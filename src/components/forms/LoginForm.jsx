import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Coffee } from "lucide-react";

/* ── Esquema Zod ── */
const schema = z.object({
  email: z
    .string()
    .min(1, "El correo es obligatorio.")
    .email("Ingresa un correo válido (ej: usuario@correo.com)."),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria.")
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula.")
    .regex(/[0-9]/, "Debe contener al menos un número."),
});

/* ── Componente ── */
const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setServerError("");
    // Simular latencia de red
    await new Promise((res) => setTimeout(res, 600));

    const result = login(data);

    if (!result.ok) {
      setServerError(result.error);
      return;
    }

    navigate("/");
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="bg-[#3E2723] rounded-full p-3 mb-4">
          <Coffee className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-[#3E2723]">Bienvenido</h1>
        <p className="text-sm text-[#8D6E63] mt-1">
          Inicia sesión en tu cuenta
        </p>
      </div>

      {/* Error de servidor */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-5">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[#3E2723] mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            placeholder="usuario@correo.com"
            autoComplete="email"
            {...register("email")}
            className={`w-full px-4 py-2.5 rounded-lg border text-sm text-[#3E2723] placeholder-[#BCAAA4] bg-white
              focus:outline-none focus:ring-2 focus:ring-[#6D4C41] transition
              ${errors.email ? "border-red-400 bg-red-50" : "border-[#D7CCC8]"}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-sm font-medium text-[#3E2723] mb-1">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              {...register("password")}
              className={`w-full px-4 py-2.5 pr-10 rounded-lg border text-sm text-[#3E2723] placeholder-[#BCAAA4] bg-white
                focus:outline-none focus:ring-2 focus:ring-[#6D4C41] transition
                ${errors.password ? "border-red-400 bg-red-50" : "border-[#D7CCC8]"}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8D6E63] hover:text-[#3E2723] transition"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Botón submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 bg-[#3E2723] hover:bg-[#5D4037] disabled:bg-[#BCAAA4]
            text-white font-medium rounded-lg transition-colors duration-200 text-sm"
        >
          {isSubmitting ? "Verificando..." : "Iniciar sesión"}
        </button>

        {/* Link a registro */}
        <p className="text-center text-sm text-[#8D6E63]">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-[#6D4C41] font-medium hover:text-[#3E2723] underline transition"
          >
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
