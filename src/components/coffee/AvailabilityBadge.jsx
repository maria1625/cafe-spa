/**
 * AvailabilityBadge
 * Badge de disponibilidad que se muestra sobre la imagen del café.
 *
 * Props:
 *   available {boolean} - true = disponible, false = agotado
 *   className {string}  - Clases adicionales (opcional)
 */
const AvailabilityBadge = ({ available, className = "" }) => {
  return (
    <span
      className={`
        px-3 py-1 rounded-full text-xs font-medium text-white
        ${available ? "bg-green-500" : "bg-gray-500"}
        ${className}
      `}
    >
      {available ? "Disponible" : "Agotado"}
    </span>
  );
};

export default AvailabilityBadge;
