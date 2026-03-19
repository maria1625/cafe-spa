import CoffeeCard from "./CoffeeCard";

/**
 * CoffeeList
 * Grid responsivo de tarjetas de café.
 *
 * Props:
 *   coffees {Array} - Lista de objetos café transformados por coffeeService
 */
const CoffeeList = ({ coffees = [] }) => {
  if (coffees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-2xl font-medium text-gray-500 mb-2">
          No hay cafés disponibles
        </p>
        <p className="text-sm text-gray-400">
          Intenta recargar la página o vuelve más tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {coffees.map((coffee) => (
        <CoffeeCard key={coffee.id} coffee={coffee} />
      ))}
    </div>
  );
};

export default CoffeeList;
