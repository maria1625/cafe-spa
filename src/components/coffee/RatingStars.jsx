import { Star } from "lucide-react";

/**
 * RatingStars
 * Muestra 5 estrellas con llenado parcial proporcional al rating.
 * Usa clip por width % para representar valores decimales (ej: 3.7).
 *
 * Props:
 *   rating {number} - Valor entre 0 y 5 (puede ser decimal)
 *   size   {string} - Tamaño de ícono Tailwind (default: "w-4 h-4")
 */
const RatingStars = ({ rating = 0, size = "w-4 h-4" }) => {
  const clampedRating = Math.min(Math.max(rating, 0), 5);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const fillPercentage = Math.min(
          Math.max((clampedRating - i) * 100, 0),
          100
        );

        return (
          <div key={i} className="relative">
            {/* Estrella vacía (fondo) */}
            <Star className={`${size} text-orange-400`} />
            {/* Estrella llena (clip según porcentaje) */}
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Star className={`${size} text-orange-400 fill-orange-400`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RatingStars;
