import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

const RegisterForm = () => {
  const { register: registerUser } = useAuth();

  const { register,handleSubmit,watch,formState: { errors, isSubmitting },} = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    await new Promise((res) => setTimeout(res, 1000));
    registerUser(data);
    alert("Registro exitoso");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <input placeholder="Nombre" {...register("name", { required: true })} />
      {errors.name && <p>El nombre es obligatorio</p>}

      <input placeholder="Correo" {...register("email", { required: true })} />
      {errors.email && <p>El correo es obligatorio</p>}

      <input
        type="password"
        placeholder="Contraseña"
        {...register("password", { required: true })}
      />
      {errors.password && <p>La contraseña es obligatoria</p>}

      <input
        type="password"
        placeholder="Confirmar contraseña"
        {...register("confirmPassword", {
          required: true,
          validate: (value) =>
            value === password || "Las contraseñas no coinciden",
        })}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Cargando..." : "Registrarse"}
      </button>
    </form>
  );
};

export default RegisterForm;