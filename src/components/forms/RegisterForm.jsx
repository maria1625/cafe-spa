import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Coffee } from "lucide-react";

/* ── Esquema Zod ── */
const schema = z
  .object({
    name: z
      .string()
      .min(1, "El nombre es obligatorio.")
      .min(2, "El nombre debe tener al menos 2 caracteres.")
      .max(50, "El nombre no puede superar los 50 caracteres.")
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras."),
    email: z
      .string()
      .min(1, "El correo es obligatorio.")
      .email("Ingresa un correo válido (ej: usuario@correo.com)."),
    password: z
      .string()
      .min(1, "La contraseña es obligatoria.")
      .min(8, "La contraseña debe tener al menos 8 caracteres.")
      .max(64, "La contraseña no puede superar los 64 caracteres.")
      .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula.")
      .regex(/[a-z]/, "Debe contener al menos una letra minúscula.")
      .regex(/[0-9]/, "Debe contener al menos un número.")
      .regex(/[^a-zA-Z0-9]/, "Debe contener al menos un carácter especial (ej: !@#$)."),
    confirmPassword: z.string().min(1, "Confirma tu contraseña."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden.",
  });

/* ── Indicador de fortaleza ── */
const getStrength = (password) => {
  if (!password) return { level: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8)            score++;
  if (/[A-Z]/.test(password))          score++;
  if (/[a-z]/.test(password))          score++;
  if (/[0-9]/.test(password))          score++;
  if (/[^a-zA-Z0-9]/.test(password))   score++;

  if (score <= 2) return { level: score, label: "Débil",    color: "bg-red-400" };
  if (score <= 3) return { level: score, label: "Regular",  color: "bg-yellow-400" };
  if (score <= 4) return { level: score, label: "Buena",    color: "bg-blue-400" };
  return           { level: score, label: "Fuerte",         color: "bg-green-500" };
};

/* ── Componente de campo con error ── */
const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-sm font-medium text-[#3E2723] mb-1">{label}</label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

/* ── Componente principal ── */
const RegisterForm = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword]         = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError]           = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const passwordValue = watch("password", "");
  const strength = getStrength(passwordValue);

  const onSubmit = async (data) => {
    setServerError("");
    await new Promise((res) => setTimeout(res, 600));

    const result = registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (!result.ok) {
      setServerError(result.error);
      return;
    }

    navigate("/");
  };

  const inputClass = (hasError) =>
    `w-full px-4 py-2.5 rounded-lg border text-sm text-[#3E2723] placeholder-[#BCAAA4] bg-white
     focus:outline-none focus:ring-2 focus:ring-[#6D4C41] transition
     ${hasError ? "border-red-400 bg-red-50" : "border-[#D7CCC8]"}`;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="bg-[#3E2723] rounded-full p-3 mb-4">
          <Coffee className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-[#3E2723]">Crear cuenta</h1>
        <p className="text-sm text-[#8D6E63] mt-1">
          Únete a nuestra comunidad cafetera
        </p>
      </div>

      {/* Error de servidor */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-5">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

        {/* Nombre */}
        <Field label="Nombre completo" error={errors.name?.message}>
          <input
            type="text"
            placeholder="Juan Pérez"
            autoComplete="name"
            {...register("name")}
            className={inputClass(!!errors.name)}
          />
        </Field>

        {/* Email */}
        <Field label="Correo electrónico" error={errors.email?.message}>
          <input
            type="email"
            placeholder="usuario@correo.com"
            autoComplete="email"
            {...register("email")}
            className={inputClass(!!errors.email)}
          />
        </Field>

        {/* Contraseña */}
        <Field label="Contraseña" error={errors.password?.message}>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="new-password"
              {...register("password")}
              className={inputClass(!!errors.password) + " pr-10"}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8D6E63] hover:text-[#3E2723] transition"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Indicador de fortaleza */}
          {passwordValue && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      i <= strength.level ? strength.color : "bg-[#D7CCC8]"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-[#8D6E63]">
                Fortaleza: <span className="font-medium">{strength.label}</span>
              </p>
            </div>
          )}
        </Field>

        {/* Confirmar contraseña */}
        <Field label="Confirmar contraseña" error={errors.confirmPassword?.message}>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="new-password"
              {...register("confirmPassword")}
              className={inputClass(!!errors.confirmPassword) + " pr-10"}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8D6E63] hover:text-[#3E2723] transition"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </Field>

        {/* Requisitos */}
        <ul className="text-xs text-[#8D6E63] space-y-0.5 pl-1">
          {[
            ["Mínimo 8 caracteres",            /.{8,}/.test(passwordValue)],
            ["Una letra mayúscula",             /[A-Z]/.test(passwordValue)],
            ["Una letra minúscula",             /[a-z]/.test(passwordValue)],
            ["Un número",                       /[0-9]/.test(passwordValue)],
            ["Un carácter especial (!@#$...)",  /[^a-zA-Z0-9]/.test(passwordValue)],
          ].map(([label, met]) => (
            <li key={label} className={`flex items-center gap-1.5 ${met ? "text-green-600" : ""}`}>
              <span>{met ? "✓" : "·"}</span> {label}
            </li>
          ))}
        </ul>

        {/* Botón submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 bg-[#3E2723] hover:bg-[#5D4037] disabled:bg-[#BCAAA4]
            text-white font-medium rounded-lg transition-colors duration-200 text-sm"
        >
          {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
        </button>

        {/* Link a login */}
        <p className="text-center text-sm text-[#8D6E63]">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-[#6D4C41] font-medium hover:text-[#3E2723] underline transition"
          >
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
