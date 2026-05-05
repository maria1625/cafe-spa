import { useFilters } from "../../context/FilterContext";

const AvailabilityCheckbox = () => {
  const { filters, updateFilter } = useFilters();

  const handleChange = (e) => {
    updateFilter("availability", e.target.checked);
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>
        <input
          type="checkbox"
          checked={filters.availability}
          onChange={handleChange}
          style={styles.checkbox}
        />
        Mostrar solo disponibles
      </label>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  checkbox: {
    cursor: "pointer",
    width: "18px",
    height: "18px",
  },
};

export default AvailabilityCheckbox;
