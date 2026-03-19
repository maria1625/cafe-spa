/**
 * PriceTag
 * Muestra el precio de un café con formato de moneda.
 *
 * Props:
 *   price     {number} - Precio del café
 *   className {string} - Clases adicionales (opcional)
 */
const PriceTag = ({ price = 0, className = "" }) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price);

  return (
    <span className={`text-lg font-bold text-amber-900 ${className}`}>
      {formatted}
    </span>
  );
};

export default PriceTag;
