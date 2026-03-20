import { Star } from "lucide-react";
import CoffeeImage from "./CoffeeImage";

/**
 * CoffeeCard
 * Diseño exacto del nuevo Figma (Mockup_SPA_Catálogo_Café.zip).
 * Sin shadcn/ui — solo divs con Tailwind.
 *
 * Props:
 *   coffee {object} - { id, brand, name, origin, type, image, price, rating, votes, available, notes }
 */
const CoffeeCard = ({ coffee }) => {
  const { brand, name, origin, type, image, price, rating, votes, available, notes } = coffee;

  return (
    <div className="overflow-hidden rounded-xl border border-[#D7CCC8] bg-white hover:shadow-xl transition-shadow duration-300">

      {/* Imagen */}
      <div className="relative h-48 overflow-hidden bg-[#EFEBE9]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = "https://picsum.photos/seed/coffee-default/400/300";
          }}
        />
        {!available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-red-600 text-white text-sm font-medium px-3 py-1 rounded-full">
              No disponible
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4">
        {/* Nombre + Precio */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[#3E2723] truncate">
              {name}
            </h3>
            <p className="text-sm text-[#6D4C41]">{brand}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-bold text-[#3E2723]">${price}</p>
          </div>
        </div>

        {/* Descripción (notes) */}
        <p className="text-sm text-[#8D6E63] mb-3 line-clamp-2">
          {notes || "Café de especialidad seleccionado cuidadosamente."}
        </p>

        {/* Origen y Tueste */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-xs text-[#6D4C41]">Origen:</span>
            <span className="text-xs font-medium text-[#3E2723]">{origin}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-[#6D4C41]">Tueste:</span>
            <span className="text-xs font-medium text-[#3E2723]">{type}</span>
          </div>
        </div>
      </div>

      {/* Footer: rating + votos */}
      <div className="px-4 pb-4 pt-0 flex items-center justify-between border-t border-[#EFEBE9]">
        <div className="flex items-center gap-1 pt-3">
          <Star className="w-4 h-4 fill-[#FFA726] text-[#FFA726]" />
          <span className="font-semibold text-[#3E2723]">{rating}</span>
          <span className="text-sm text-[#8D6E63]">({votes})</span>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
