const FALLBACK_URL =
  "https://picsum.photos/seed/coffee-default/400/300";

/**
 * CoffeeImage
 * Muestra la imagen de un café con fallback si no carga.
 *
 * Props:
 *   src      {string} - URL de la imagen
 *   alt      {string} - Texto alternativo
 *   className {string} - Clases adicionales (opcional)
 */
const CoffeeImage = ({ src, alt, className = "" }) => {
  const handleError = (e) => {
    e.currentTarget.src = FALLBACK_URL;
  };

  return (
    <img
      src={src || FALLBACK_URL}
      alt={alt}
      onError={handleError}
      className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${className}`}
    />
  );
};

export default CoffeeImage;
