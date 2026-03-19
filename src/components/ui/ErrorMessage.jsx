import { AlertTriangle } from "lucide-react";

/**
 * ErrorMessage
 * Pantalla completa de error centrada.
 *
 * Props:
 *   onRetry {function} - Callback al reintentar (opcional, si no recarga la página)
 */
const ErrorMessage = ({ onRetry }) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center text-center max-w-md px-6">

        {/* Ícono */}
        <div className="bg-red-50 rounded-full p-6 mb-6">
          <AlertTriangle className="w-16 h-16 text-red-500" strokeWidth={1.5} />
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Error al cargar los cafés
        </h1>

        {/* Subtítulo */}
        <p className="text-gray-500 mb-8">
          Recarga la página para intentar nuevamente
        </p>

        {/* Botón */}
        <button
          onClick={handleRetry}
          className="px-8 py-3 bg-red-500 hover:bg-red-600 active:scale-95 text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md transform"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
