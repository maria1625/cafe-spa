import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Coffee, LogOut, Menu, X } from "lucide-react";

/**
 * Navbar
 * Diseño EXACTO del Figma (Mockup_SPA_Catálogo_Café.zip — Navbar.tsx).
 *
 * Cambios respecto a la versión anterior:
 * - Logo: ícono Coffee directo size-8, sin contenedor bg-white/10
 * - Logo texto: "CaféHub" font-semibold text-xl (no "CoffeeHub")
 * - Logo hover: opacity-80
 * - Links: hover:text-[#D7CCC8] (no hover:text-white)
 * - Autenticado: separador border-l border-[#6D4C41] + "Hola, {name}" en text-[#D7CCC8]
 * - Botón logout: ícono LogOut + hover:bg-[#4E342E] (no bg-white/10)
 * - Sin sesión: botón Registro bg-[#6D4C41] hover:bg-[#5D4037] text-white (no ámbar)
 * - Texto "Login" (no "Iniciar sesión")
 * - Mobile: menú hamburguesa conservado (no está en Figma, añadido por responsividad)
 */
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-[#3E2723] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Coffee className="w-8 h-8" />
            <span className="font-semibold text-xl">CaféHub</span>
          </Link>

          {/* ── Links desktop ── */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-[#D7CCC8] transition-colors">
              Inicio
            </Link>

            {user ? (
              <>
                <Link to="/catalogo" className="hover:text-[#D7CCC8] transition-colors">
                  Catálogo
                </Link>
                <Link to="/dashboard" className="hover:text-[#D7CCC8] transition-colors">
                  Dashboard
                </Link>

                {/* Separador + saludo + logout */}
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-[#6D4C41]">
                  <span className="text-[#D7CCC8]">Hola, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-white hover:bg-[#4E342E] px-3 py-1.5 rounded-lg transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Salir
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-[#D7CCC8] transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#6D4C41] hover:bg-[#5D4037] text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Registro
                </Link>
              </>
            )}
          </div>

          {/* ── Hamburguesa mobile ── */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg hover:bg-[#4E342E] transition-colors"
            aria-label="Abrir menú"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Menú mobile ── */}
      {menuOpen && (
        <div className="md:hidden bg-[#4E342E] border-t border-[#6D4C41] px-4 py-4 space-y-1">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:text-[#D7CCC8] hover:bg-[#3E2723] transition-colors"
          >
            Inicio
          </Link>

          {user ? (
            <>
              <Link
                to="/catalogo"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:text-[#D7CCC8] hover:bg-[#3E2723] transition-colors"
              >
                Catálogo
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:text-[#D7CCC8] hover:bg-[#3E2723] transition-colors"
              >
                Dashboard
              </Link>
              <div className="border-t border-[#6D4C41] pt-3 mt-2 flex items-center justify-between">
                <span className="text-[#D7CCC8] text-sm">
                  Hola, <span className="font-medium text-white">{user.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-white hover:bg-[#3E2723] px-3 py-1.5 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Salir
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:text-[#D7CCC8] hover:bg-[#3E2723] transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-lg bg-[#6D4C41] hover:bg-[#5D4037] text-white text-center transition-colors"
              >
                Registro
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
