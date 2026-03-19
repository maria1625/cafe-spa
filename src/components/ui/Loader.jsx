/**
 * Loader
 * Pantalla completa de carga — diseño exacto del Figma (Pantalla_de_carga_café.zip).
 * Fusiona el Spinner dentro para evitar conflictos de animación.
 */
const Loader = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-[#E8E4DC] overflow-hidden">

      {/* ── Granos decorativos de fondo (blobs difuminados) ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[8%] w-32 h-40 rounded-full bg-[#D5CEC3] opacity-30 blur-3xl" />
        <div className="absolute top-[60%] left-[15%] w-48 h-56 rounded-full bg-[#D5CEC3] opacity-25 blur-3xl" />
        <div className="absolute top-[25%] right-[12%] w-40 h-48 rounded-full bg-[#D5CEC3] opacity-30 blur-3xl" />
        <div className="absolute bottom-[15%] right-[8%] w-44 h-52 rounded-full bg-[#D5CEC3] opacity-25 blur-3xl" />
        <div className="absolute top-[45%] left-[5%] w-28 h-36 rounded-full bg-[#D5CEC3] opacity-20 blur-3xl" />
        <div className="absolute bottom-[35%] right-[15%] w-36 h-44 rounded-full bg-[#D5CEC3] opacity-25 blur-3xl" />
      </div>

      {/* ── Contenido central ── */}
      <div className="relative z-10 flex flex-col items-center gap-8">

        {/* Spinner: anillo girando + taza de café */}
        <div className="relative w-28 h-28 flex items-center justify-center">

          {/* Anillo SVG girando (animate-spin de Tailwind, duration personalizado inline) */}
          <div className="absolute inset-0">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              style={{ animation: "spin 3s linear infinite" }}
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#8B7355"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="220 80"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* Círculo blanco central con ícono de taza */}
          <div className="relative bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-sm">
            <CoffeeCupIcon />
          </div>
        </div>

        {/* Texto + puntos animados */}
        <div className="text-center">
          <p className="text-lg text-[#6B5B4A] tracking-wide">
            Cargando cafés...
          </p>

          <div className="flex gap-2 justify-center mt-4">
            <span
              className="w-2 h-2 bg-[#6B5B4A] rounded-full"
              style={{ animation: "bounceDot 1s ease-in-out infinite 0ms" }}
            />
            <span
              className="w-2 h-2 bg-[#6B5B4A] rounded-full"
              style={{ animation: "bounceDot 1s ease-in-out infinite 150ms" }}
            />
            <span
              className="w-2 h-2 bg-[#6B5B4A] rounded-full"
              style={{ animation: "bounceDot 1s ease-in-out infinite 300ms" }}
            />
          </div>
        </div>
      </div>

      {/* ── Keyframes inline ── */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes bounceDot {
          0%, 80%, 100% { transform: translateY(0); }
          40%           { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
};

/* ── Ícono taza de café (SVG del Figma) ── */
const CoffeeCupIcon = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Cuerpo de la taza */}
    <path
      d="M9 13L10.5 25C10.6 26.1 11.5 27 12.6 27H23.4C24.5 27 25.4 26.1 25.5 25L27 13H9Z"
      fill="#8B7355"
    />
    {/* Borde superior */}
    <rect x="8" y="12" width="20" height="2" rx="1" fill="#6B5B4A" />
    {/* Asa */}
    <path
      d="M27 16C27 16 29.5 16 29.5 18.5C29.5 21 27 21 27 21"
      stroke="#8B7355"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Vapor izquierdo */}
    <path
      d="M14 9C14 9 14 7 15.5 7C17 7 17 9 17 9"
      stroke="#6B5B4A"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
    {/* Vapor derecho */}
    <path
      d="M19.5 8C19.5 8 19.5 6 21 6C22.5 6 22.5 8 22.5 8"
      stroke="#6B5B4A"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

export default Loader;
