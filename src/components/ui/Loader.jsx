import { Coffee } from "lucide-react";

/**
 * Loader
 * Estado de carga — diseño exacto del nuevo Figma (Mockup_SPA_Catálogo_Café.zip).
 * Centrado con py-16, sin min-h-screen.
 *
 * Props:
 *   message {string} - Texto de carga (opcional)
 */
const Loader = ({ message = "Cargando cafés..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <Coffee className="w-16 h-16 text-[#6D4C41] animate-pulse" />
        <div className="absolute inset-0 bg-[#6D4C41]/20 rounded-full blur-xl animate-pulse" />
      </div>
      <p className="mt-4 text-[#3E2723] font-medium">{message}</p>
    </div>
  );
};

export default Loader;
