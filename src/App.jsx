import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FilterProvider } from "./context/FilterContext";
import Navbar from "./components/layout/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <FilterProvider>
        <Navbar />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/"         element={<LandingPage />} />
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rutas protegidas */}
          <Route path="/catalogo"   element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/dashboard"  element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        </Routes>
      </FilterProvider>
    </BrowserRouter>
  );
}

export default App;
