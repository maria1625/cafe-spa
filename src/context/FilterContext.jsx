import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    availability: true,
    sortBy: "name", // "name", "price", "rating"
  });

  const updateFilter = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      availability: true,
      sortBy: "name",
    });
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        updateFilter,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters debe usarse dentro de FilterProvider");
  }
  return context;
};
