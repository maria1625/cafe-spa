import { useState, useMemo } from "react";
import { useFilters } from "../../context/FilterContext";

// Datos de ejemplo de cafés
const SAMPLE_CAFES = [
  {
    id: 1,
    name: "Espresso Clásico",
    price: 2.5,
    rating: 4.8,
    available: true,
  },
  {
    id: 2,
    name: "Capuchino Cremoso",
    price: 3.5,
    rating: 4.9,
    available: true,
  },
  {
    id: 3,
    name: "Café Latte Suave",
    price: 3.2,
    rating: 4.7,
    available: true,
  },
  {
    id: 4,
    name: "Americano Fuerte",
    price: 2.0,
    rating: 4.5,
    available: false,
  },
  {
    id: 5,
    name: "Flat White",
    price: 4.0,
    rating: 4.9,
    available: true,
  },
  {
    id: 6,
    name: "Macchiato Italiano",
    price: 3.8,
    rating: 4.6,
    available: true,
  },
  {
    id: 7,
    name: "Mocha Chocolatado",
    price: 4.5,
    rating: 4.8,
    available: false,
  },
  {
    id: 8,
    name: "Cortado Perfecto",
    price: 2.8,
    rating: 4.7,
    available: true,
  },
];

const CoffeeList = () => {
  const { filters } = useFilters();

  // Filtrar y ordenar cafés
  const filteredAndSortedCafes = useMemo(() => {
    let result = [...SAMPLE_CAFES];

    // Filtro por disponibilidad
    if (filters.availability) {
      result = result.filter((cafe) => cafe.available);
    }

    // Ordenamiento
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
      default:
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [filters]);

  return (
    <div style={styles.container}>
      {filteredAndSortedCafes.length === 0 ? (
        <div style={styles.empty}>
          <p>No hay cafés que coincidan con los filtros</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredAndSortedCafes.map((cafe) => (
            <div key={cafe.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>{cafe.name}</h3>
                <span
                  style={{
                    ...styles.badge,
                    backgroundColor: cafe.available ? "#27ae60" : "#e74c3c",
                  }}
                >
                  {cafe.available ? "Disponible" : "Agotado"}
                </span>
              </div>

              <div style={styles.cardBody}>
                <div style={styles.infoRow}>
                  <span style={styles.label}>Precio:</span>
                  <span style={styles.value}>${cafe.price.toFixed(2)}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.label}>Rating:</span>
                  <span style={styles.value}>⭐ {cafe.rating}</span>
                </div>
              </div>

              <button
                style={{
                  ...styles.button,
                  opacity: cafe.available ? 1 : 0.5,
                  cursor: cafe.available ? "pointer" : "not-allowed",
                }}
                disabled={!cafe.available}
              >
                {cafe.available ? "Agregar al carrito" : "No disponible"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  cardHeader: {
    padding: "15px",
    borderBottom: "1px solid #f0f0f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    margin: "0",
    fontSize: "16px",
    fontWeight: "bold",
  },
  badge: {
    padding: "4px 8px",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "bold",
  },
  cardBody: {
    padding: "15px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    fontSize: "14px",
  },
  label: {
    fontWeight: "500",
    color: "#666",
  },
  value: {
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  empty: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#999",
  },
};

export { SAMPLE_CAFES };
export default CoffeeList;
