import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchCoffees } from "../services/coffeeService";
import CoffeeList from "../components/coffee/CoffeeList";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";

/**
 * DashboardPage
 * Página principal del catálogo — diseño exacto del Figma (Mockup_SPA.zip).
 * Estados: loading → <Loader /> | error → <ErrorMessage /> | ok → catálogo
 */
const DashboardPage = () => {
  const { user } = useAuth();

  const [coffees, setCoffees]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy]       = useState("default");

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

  /* ── Filtro + ordenamiento (sin nueva petición) ── */
  const filteredCoffees = useMemo(() => {
    let result = [...coffees];

    if (onlyAvailable) {
      result = result.filter((c) => c.available);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        result.sort((a, b) => b.votes - a.votes);
        break;
      default:
        break;
    }

    return result;
  }, [coffees, onlyAvailable, sortBy]);

  const handleClearFilters = () => {
    setOnlyAvailable(false);
    setSortBy("default");
  };

  /* ── Estado: cargando ── */
  if (loading) return <Loader />;

  /* ── Estado: error ── */
  if (error) {
    return <ErrorMessage onRetry={loadCoffees} />;
  }

  /* ── Estado: éxito ── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Encabezado centrado ── */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-950 mb-3">
            Explora las mejores marcas de café
          </h1>
          <p className="text-lg text-amber-800">
            Descubre nuestra selección premium de cafés de especialidad
          </p>
          {user?.name && (
            <p className="mt-2 text-sm text-amber-600">
              Bienvenido,{" "}
              <span className="font-semibold">{user.name}</span> ☕
            </p>
          )}
        </div>

        {/* ── Barra de filtros ── */}
        <div className="w-full bg-[#FEF7ED] border border-orange-200/40 rounded-lg shadow-sm px-6 py-4 mb-6">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">

            {/* Checkbox solo disponibles */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="w-4 h-4 accent-orange-600 cursor-pointer"
              />
              <span className="text-sm text-gray-700">Solo disponibles</span>
            </label>

            {/* Select ordenar */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-orange-200/60 bg-white text-gray-700 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
            >
              <option value="default">Ordenar por</option>
              <option value="popular">Más popular</option>
              <option value="price-asc">Precio menor a mayor</option>
              <option value="price-desc">Precio mayor a menor</option>
              <option value="rating">Mejor rating</option>
            </select>

            {/* Limpiar filtros */}
            <button
              onClick={handleClearFilters}
              className="ml-auto text-sm text-orange-700 hover:text-orange-800 hover:bg-orange-100/50 px-3 py-1.5 rounded-md transition-colors duration-200"
            >
              Limpiar filtros
            </button>
          </div>
        </div>

        {/* ── Indicador de resultados ── */}
        <p className="text-sm text-amber-700 mb-4">
          Mostrando{" "}
          <span className="font-semibold">{filteredCoffees.length}</span>{" "}
          de{" "}
          <span className="font-semibold">{coffees.length}</span> cafés
        </p>

        {/* ── Grid de cafés ── */}
        <CoffeeList coffees={filteredCoffees} />

        {/* ── Empty state con filtros activos ── */}
        {filteredCoffees.length === 0 && coffees.length > 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-amber-700">
              No se encontraron cafés con los filtros seleccionados
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-4 text-sm text-orange-600 underline hover:text-orange-800"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="bg-amber-900 text-amber-50 mt-8 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            © 2026 CoffeeHub — Explorando las mejores marcas de café del mundo
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
