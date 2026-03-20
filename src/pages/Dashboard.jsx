import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import FilterBar from "../components/filters/FilterBar";
import CoffeeList, { SAMPLE_CAFES } from "../components/CoffeeList";
import { useFilters } from "../context/FilterContext";

const Dashboard = () => {
  const { user } = useAuth();
  const { filters } = useFilters();

  // Calcular cantidad de cafés filtrados
  const filteredCount = useMemo(() => {
    let count = SAMPLE_CAFES.length;

    if (filters.availability) {
      count = SAMPLE_CAFES.filter((c) => c.available).length;
    }

    return count;
  }, [filters]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>☕ Bienvenida {user?.name}</h1>
        <p style={styles.subtitle}>Explora nuestro catálogo de cafés</p>
      </div>

      <FilterBar totalCafes={SAMPLE_CAFES.length} filteredCafes={filteredCount} />

      <CoffeeList />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    margin: "20px 0 10px 0",
    fontSize: "28px",
  },
  subtitle: {
    margin: "0",
    color: "#666",
    fontSize: "16px",
  },
};

export default Dashboard;
