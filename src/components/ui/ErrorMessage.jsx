import { AlertCircle } from "lucide-react";

/**
 * ErrorMessage
 * Estado de error — diseño exacto del nuevo Figma (Mockup_SPA_Catálogo_Café.zip).
 * Centrado con py-16, sin min-h-screen.
 *
 * Props:
 *   onRetry  {function} - Callback al reintentar (opcional)
 *   message  {string}   - Título del error (opcional)
 */
const ErrorMessage = ({ onRetry, message = "Error al cargar los cafés" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">

      {/* Ícono */}
      <div className="bg-red-50 rounded-full p-6 mb-4">
        <AlertCircle className="w-12 h-12 text-red-600" />
      </div>

      {/* Título */}
      <h3 className="text-xl font-semibold text-[#3E2723] mb-2">
        {message}
      </h3>

      {/* Subtítulo */}
      <p className="text-[#6D4C41] mb-6">
        Por favor, intenta de nuevo
      </p>

      {/* Botón */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-[#6D4C41] hover:bg-[#5D4037] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          Reintentar
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
