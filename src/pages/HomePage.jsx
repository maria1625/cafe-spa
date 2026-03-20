import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchCoffees } from "../services/coffeeService";
import CoffeeCard from "../components/coffee/CoffeeCard";
import CoffeeList from "../components/coffee/CoffeeList";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";

/**
 * HomePage
 * Catálogo de cafés — diseño exacto del nuevo Figma (Mockup_SPA_Catálogo_Café.zip).
 * Fetch real con coffeeService, filtros y ordenamiento.
 */
const HomePage = () => {
  const [coffees, setCoffees]             = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [sortBy, setSortBy]               = useState("name");

  const loadCoffees = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await fetchCoffees();
      setCoffees(data);
    } catch (err) {
      setError(err.message || "Error desconocido al cargar los cafés.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCoffees();
  }, [loadCoffees]);

  /* ── Filtro + ordenamiento ── */
  const filteredCoffees = useMemo(() => {
    let result = [...coffees];

    if (showAvailableOnly) {
      result = result.filter((c) => c.available);
    }

    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [coffees, showAvailableOnly, sortBy]);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Header ── */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#3E2723] mb-2">
            Catálogo de Café Premium
          </h1>
          <p className="text-[#6D4C41]">
            Descubre nuestra selección de cafés de origen único
          </p>
        </div>

        {/* ── FilterBar ── */}
        <div className="bg-white rounded-lg border border-[#D7CCC8] shadow-sm px-5 py-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">

            {/* Checkbox solo disponibles */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showAvailableOnly}
                onChange={(e) => setShowAvailableOnly(e.target.checked)}
                className="w-4 h-4 accent-[#6D4C41] cursor-pointer"
              />
              <span className="text-sm text-[#3E2723]">Solo disponibles</span>
            </label>

            {/* Select ordenar */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm text-[#3E2723] whitespace-nowrap">
                Ordenar por:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-[#D7CCC8] bg-white text-[#3E2723] rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#6D4C41] cursor-pointer w-full sm:w-auto"
              >
                <option value="name">Nombre</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Valorados</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── Estados ── */}
        {loading && <Loader />}

        {error && !loading && (
          <ErrorMessage onRetry={loadCoffees} />
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCoffees.map((coffee) => (
                <CoffeeCard key={coffee.id} coffee={coffee} />
              ))}
            </div>

            {filteredCoffees.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[#6D4C41] text-lg">
                  No se encontraron cafés con los filtros seleccionados
                </p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default HomePage;
