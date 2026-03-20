import { createContext, useContext, useState, useEffect } from "react";

/**
 * AuthContext
 * Maneja registro, login, logout y persistencia de sesión.
 *
 * Persistencia:
 *   - "cafe_users"   → localStorage: array de usuarios registrados
 *   - "cafe_session" → localStorage: usuario de la sesión activa
 *
 * No se usan cookies reales (document.cookie) porque este proyecto no
 * tiene backend — localStorage cumple el mismo rol de persistencia entre
 * recargas de página dentro del navegador.
 */

const AuthContext = createContext();

const USERS_KEY   = "cafe_users";
const SESSION_KEY = "cafe_session";

/* ── Helpers de storage ── */
const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) ?? [];
  } catch {
    return [];
  }
};

const saveUsers = (users) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) ?? null;
  } catch {
    return null;
  }
};

const saveSession = (user) =>
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));

const clearSession = () =>
  localStorage.removeItem(SESSION_KEY);

/* ── Provider ── */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restaurar sesión al montar
  useEffect(() => {
    const session = getSession();
    if (session) setUser(session);
  }, []);

  /**
   * register
   * Crea un nuevo usuario y lo persiste en la lista de usuarios.
   * @returns {{ ok: boolean, error?: string }}
   */
  const register = ({ name, email, password }) => {
    const users = getUsers();

    const alreadyExists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadyExists) {
      return { ok: false, error: "Ya existe una cuenta con ese correo." };
    }

    const newUser = { name, email, password };
    saveUsers([...users, newUser]);

    // Iniciar sesión automáticamente tras registrarse
    const session = { name, email };
    saveSession(session);
    setUser(session);

    return { ok: true };
  };

  /**
   * login
   * Valida credenciales contra la lista de usuarios registrados.
   * @returns {{ ok: boolean, error?: string }}
   */
  const login = ({ email, password }) => {
    const users = getUsers();

    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!found) {
      return { ok: false, error: "Correo o contraseña incorrectos." };
    }

    const session = { name: found.name, email: found.email };
    saveSession(session);
    setUser(session);

    return { ok: true };
  };

  /**
   * logout
   * Cierra la sesión activa sin borrar la lista de usuarios.
   */
  const logout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
