import { useFilters } from "../../context/FilterContext";

const ClearFiltersButton = () => {
  const { clearFilters } = useFilters();

  return (
    <button onClick={clearFilters} style={styles.button}>
      🔄 Limpiar filtros
    </button>
  );
};

const styles = {
  button: {
    padding: "8px 16px",
    fontSize: "14px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};

export default ClearFiltersButton;
