import CoffeeCard from "./CoffeeCard";

/**
 * CoffeeList
 * Grid responsivo de tarjetas de café.
 * Diseño exacto del nuevo Figma (Mockup_SPA_Catálogo_Café.zip).
 *
 * Props:
 *   coffees {Array} - Lista de objetos café transformados por coffeeService
 */
const CoffeeList = ({ coffees = [] }) => {
  if (coffees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg font-medium text-[#6D4C41] mb-1">
          No hay cafés disponibles
        </p>
        <p className="text-sm text-[#8D6E63]">
          Intenta recargar la página o vuelve más tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coffees.map((coffee) => (
        <CoffeeCard key={coffee.id} coffee={coffee} />
      ))}
    </div>
  );
};

export default CoffeeList;
