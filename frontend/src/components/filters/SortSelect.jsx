import { useFilters } from "../../context/FilterContext";

const SortSelect = () => {
  const { filters, updateFilter } = useFilters();

  const handleChange = (e) => {
    updateFilter("sortBy", e.target.value);
  };

  return (
    <div style={styles.container}>
      <label htmlFor="sort-select" style={styles.label}>
        Ordenar por:
      </label>
      <select
        id="sort-select"
        value={filters.sortBy}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="name">Nombre (A-Z)</option>
        <option value="price-asc">Precio: Menor a Mayor</option>
        <option value="price-desc">Precio: Mayor a Menor</option>
        <option value="rating">Rating (Mayor primero)</option>
      </select>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
  },
  select: {
    padding: "8px 12px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    cursor: "pointer",
    backgroundColor: "#fff",
  },
};

export default SortSelect;
