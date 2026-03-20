import AvailabilityCheckbox from "./AvailabilityCheckbox";
import SortSelect from "./SortSelect";
import ClearFiltersButton from "./ClearFiltersButton";
import { useFilters } from "../../context/FilterContext";

const FilterBar = ({ totalCafes, filteredCafes }) => {
  const { filters } = useFilters();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Filtros</h3>
      </div>

      <div style={styles.filterGroup}>
        <AvailabilityCheckbox />
      </div>

      <div style={styles.filterGroup}>
        <SortSelect />
      </div>

      <div style={styles.filterGroup}>
        <ClearFiltersButton />
      </div>

      <div style={styles.counter}>
        <p style={styles.counterText}>
          📊 {filteredCafes} de {totalCafes} cafés
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #e0e0e0",
  },
  header: {
    marginBottom: "15px",
  },
  title: {
    margin: "0 0 15px 0",
    fontSize: "18px",
    fontWeight: "bold",
  },
  filterGroup: {
    marginBottom: "12px",
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },
  counter: {
    marginTop: "15px",
    paddingTop: "15px",
    borderTop: "1px solid #ddd",
  },
  counterText: {
    margin: "0",
    fontSize: "14px",
    color: "#666",
    fontWeight: "500",
  },
};

export default FilterBar;
