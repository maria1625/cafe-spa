import { useState } from "react";
import { Heart } from "lucide-react";
import { Star } from "lucide-react";
import CoffeeImage from "./CoffeeImage";

/**
 * CoffeeCard
 * Tarjeta individual de café — diseño exacto del Figma (Catalogo.zip).
 *
 * Props:
 *   coffee {object} - { id, brand, name, origin, type, image, price, rating, votes, available }
 */
const CoffeeCard = ({ coffee }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const { brand, name, origin, type, image, rating, votes, available } = coffee;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">

      {/* Image Container */}
      <div className="relative overflow-hidden h-56 bg-gray-100">
        <CoffeeImage src={image} alt={`${brand} ${name}`} />

        {/* Availability Badge — top left */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              available ? "bg-green-500 text-white" : "bg-gray-500 text-white"
            }`}
          >
            {available ? "Disponible" : "Agotado"}
          </span>
        </div>

        {/* Favorite Button — top right */}
        <button
          onClick={() => setIsFavorite((prev) => !prev)}
          aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        <h3 className="text-gray-900 font-medium text-sm mb-1 uppercase tracking-wide truncate">
          {brand}
        </h3>

        {/* Product Name */}
        <p className="text-gray-800 mb-1 truncate">{name}</p>

        {/* Origin and Type */}
        <p className="text-sm text-gray-500 mb-3 truncate">
          {origin} - {type}
        </p>

        {/* Rating Stars + Votes */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => {
              const fillPercentage = Math.min(
                Math.max((rating - i) * 100, 0),
                100
              );
              return (
                <div key={i} className="relative">
                  <Star className="w-4 h-4 text-orange-400" />
                  <div
                    className="absolute top-0 left-0 overflow-hidden"
                    style={{ width: `${fillPercentage}%` }}
                  >
                    <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                  </div>
                </div>
              );
            })}
          </div>
          <span className="text-xs text-gray-600">({votes})</span>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
