# ☕ CoffeeHub — SPA Catálogo de Cafés

Aplicación web de página única construida con React + Vite que permite explorar un catálogo de marcas de café premium. Incluye landing page pública, autenticación con validación estricta, rutas protegidas, filtros, ordenamiento de productos y panel de usuario.

---

## 🚀 Instalación y uso

### Requisitos

- Node.js 18+
- npm 9+

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/maria1625/cafe-spa.git
cd cafe-spa

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción en `/dist` |
| `npm run preview` | Preview del build de producción |
| `npm run lint` | Análisis estático con ESLint |

---

## 🛠 Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | UI y estado de componentes |
| Vite | 8 | Bundler y servidor de desarrollo |
| Tailwind CSS | 4 | Estilos utilitarios |
| React Router DOM | 7 | Enrutamiento SPA |
| React Hook Form | 7 | Manejo de formularios controlados |
| Zod | 4 | Validación de esquemas en formularios |
| Lucide React | 0.577 | Iconografía |
| Framer Motion | 12 | Animaciones |
| Axios | — | Peticiones HTTP a la API |

**API externa:** `https://fake-coffee-api.vercel.app/api`

---

## 🗺 Mapa de rutas

| Ruta | Acceso | Página | Descripción |
|---|---|---|---|
| `/` | 🌐 Pública | `LandingPage` | Página de entrada con Hero, features, orígenes y testimonios |
| `/login` | 🌐 Pública | `LoginPage` | Formulario de inicio de sesión con validación Zod |
| `/register` | 🌐 Pública | `RegisterPage` | Formulario de registro con validación Zod |
| `/catalogo` | 🔒 Protegida | `HomePage` | Catálogo completo con filtros y fetch a la API |
| `/dashboard` | 🔒 Protegida | `DashboardPage` | Panel personal del usuario con stats y actividad |

---

## 📁 Estructura del proyecto

```
cafe-spa/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx                         # Enrutador principal + árbol de rutas
│   ├── main.jsx                        # Punto de entrada
│   │
│   ├── context/
│   │   ├── AuthContext.jsx             # Estado global de autenticación + persistencia
│   │   └── FilterContext.jsx           # Estado global de filtros del catálogo
│   │
│   ├── services/
│   │   └── coffeeService.js            # Fetch a la API + transformación de datos
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx             # Landing pública (ruta "/")
│   │   ├── HomePage.jsx                # Catálogo con filtros (ruta "/catalogo") 🔒
│   │   ├── DashboardPage.jsx           # Panel del usuario (ruta "/dashboard") 🔒
│   │   ├── LoginPage.jsx               # Página de login
│   │   └── RegisterPage.jsx            # Página de registro
│   │
│   ├── components/
│   │   ├── ProtectedRoute.jsx          # Guard que redirige a /login si no hay sesión
│   │   │
│   │   ├── layout/
│   │   │   └── Navbar.jsx              # Navbar responsivo con Tailwind + menú mobile
│   │   │
│   │   ├── coffee/
│   │   │   ├── CoffeeCard.jsx          # Tarjeta individual de café
│   │   │   ├── CoffeeList.jsx          # Grid responsivo de CoffeeCards
│   │   │   ├── CoffeeImage.jsx         # Imagen con fallback automático
│   │   │   ├── RatingStars.jsx         # Estrellas con llenado parcial proporcional
│   │   │   ├── AvailabilityBadge.jsx   # Badge disponible / agotado
│   │   │   └── PriceTag.jsx            # Precio formateado en USD
│   │   │
│   │   ├── filters/
│   │   │   ├── FilterBar.jsx           # Barra de filtros compuesta
│   │   │   ├── AvailabilityCheckbox.jsx# Checkbox "Solo disponibles"
│   │   │   ├── SortSelect.jsx          # Select de ordenamiento
│   │   │   └── ClearFiltersButton.jsx  # Botón para limpiar filtros
│   │   │
│   │   ├── forms/
│   │   │   ├── LoginForm.jsx           # RHF + Zod: email, contraseña, validación real
│   │   │   └── RegisterForm.jsx        # RHF + Zod: nombre, email, contraseña fuerte
│   │   │
│   │   └── ui/
│   │       ├── Loader.jsx              # Estado de carga (ícono Coffee + animate-pulse)
│   │       ├── ErrorMessage.jsx        # Estado de error con botón retry integrado
│   │       ├── Spinner.jsx             # Re-export de Loader (compatibilidad)
│   │       └── RetryButton.jsx         # Re-export de ErrorMessage (compatibilidad)
│   │
│   └── assets/
│       └── hero.png
│
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🗺 Jerarquía de componentes

```
App
├── AuthProvider            (contexto global de autenticación)
│   └── FilterProvider      (contexto global de filtros)
│       ├── Navbar           (layout/Navbar.jsx)
│       └── Routes
│           ├── /            → LandingPage (pública)
│           │   └── (Hero, Stats, Features, Orígenes, Testimonios, CTA)
│           │
│           ├── /login       → LoginPage
│           │   └── LoginForm
│           │       └── (email, password, toggle visibilidad, error banner)
│           │
│           ├── /register    → RegisterPage
│           │   └── RegisterForm
│           │       └── (nombre, email, password, confirmPassword,
│           │             indicador fortaleza, checklist requisitos)
│           │
│           ├── /catalogo 🔒 → ProtectedRoute → HomePage
│           │   ├── FilterBar (inline, sin shadcn)
│           │   ├── Loader          (estado: cargando)
│           │   ├── ErrorMessage    (estado: error)
│           │   └── CoffeeList      (estado: éxito)
│           │       └── CoffeeCard[]
│           │           ├── CoffeeImage
│           │           ├── AvailabilityBadge
│           │           ├── RatingStars
│           │           └── PriceTag
│           │
│           └── /dashboard 🔒 → ProtectedRoute → DashboardPage
│               └── (Hero banner, Stats grid, Actividad reciente)
```

---

## 🔐 Autenticación

La autenticación se gestiona a través de `AuthContext` (`src/context/AuthContext.jsx`), un contexto global de React que expone `user`, `login`, `logout` y `register` a toda la aplicación.

### Persistencia con localStorage

Se usan dos claves separadas en `localStorage` para diferenciar la lista de usuarios de la sesión activa:

| Clave | Contenido | Cuándo se escribe |
|---|---|---|
| `cafe_users` | `Array` de todos los usuarios registrados | Al hacer `register()` |
| `cafe_session` | Objeto `{ name, email }` del usuario activo | Al hacer `login()` o `register()` |

La contraseña **nunca** se almacena en la sesión activa, solo en `cafe_users`.

### Flujo de registro

```
RegisterForm (Zod válido)
  → register({ name, email, password })
    → busca duplicados en cafe_users
    → si existe: retorna { ok: false, error: "Ya existe una cuenta..." }
    → si no: guarda en cafe_users[], crea sesión en cafe_session
    → setUser({ name, email }) → redirige a /catalogo
```

### Flujo de login

```
LoginForm (Zod válido)
  → login({ email, password })
    → busca en cafe_users por email + password
    → si no coincide: retorna { ok: false, error: "Correo o contraseña incorrectos." }
    → si coincide: guarda en cafe_session
    → setUser({ name, email }) → redirige a /catalogo
```

### Persistencia entre recargas

Al montar `AuthProvider`, un `useEffect` restaura la sesión desde `cafe_session`:

```js
useEffect(() => {
  const session = getSession(); // lee cafe_session de localStorage
  if (session) setUser(session);
}, []);
```

### Flujo de logout

```
Navbar → logout()
  → localStorage.removeItem("cafe_session")
  → setUser(null)
  → navigate("/")   ← redirige a la landing, no al login
```

### Protección de rutas

`ProtectedRoute` consume `useAuth()` y redirige a `/login` si `user` es `null`. Las rutas `/catalogo` y `/dashboard` están protegidas; `/`, `/login` y `/register` son públicas.

```jsx
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
};
```

---

## ✅ Validaciones de formularios

### LoginForm — reglas Zod

| Campo | Regla |
|---|---|
| Email | Obligatorio · formato válido `x@x.xx` |
| Contraseña | Obligatorio · mínimo 8 caracteres · al menos 1 mayúscula · al menos 1 número |
| Credenciales | Verifica contra `cafe_users` en `AuthContext` — error de servidor si no coincide |

### RegisterForm — reglas Zod

| Campo | Regla |
|---|---|
| Nombre | Obligatorio · solo letras (incluye tildes y ñ) · 2–50 caracteres |
| Email | Obligatorio · formato válido · sin duplicados (verificado en AuthContext) |
| Contraseña | Obligatorio · mín. 8 · máx. 64 · 1 mayúscula · 1 minúscula · 1 número · 1 especial |
| Confirmar contraseña | Debe coincidir exactamente con el campo contraseña (`z.refine`) |

### UX adicional en RegisterForm

- **Indicador de fortaleza** — barra de 5 segmentos con etiqueta: Débil / Regular / Buena / Fuerte.
- **Checklist de requisitos** — lista en tiempo real que marca en verde cada criterio cumplido.
- **Toggle mostrar/ocultar** — botón con ícono `Eye / EyeOff` en ambos campos de contraseña.
- **Banner de error de servidor** — mensaje rojo si el correo ya está registrado.

---

## 🏠 Landing Page

`LandingPage.jsx` es la página de entrada pública (`/`). No requiere autenticación.

### Secciones

| Sección | Descripción |
|---|---|
| **Hero** | Gradiente oscuro, titular con CTA en ámbar, visual decorativo con orbes de países, botones dinámicos según estado de sesión |
| **Stats** | 4 métricas: 50+ orígenes, 3.2K clientes, 98% calidad, 24h despacho |
| **¿Por qué elegirnos?** | 4 cards con hover animado: origen sostenible, selección premium, envío rápido, calidad garantizada |
| **Orígenes del mundo** | Grid de 6 países con bandera y perfil de sabor sobre fondo oscuro |
| **Testimonios** | 3 tarjetas con cita, estrellas y autor |
| **CTA final** | Banner oscuro con botón principal y link secundario |

Los botones CTA son **dinámicos**: si el usuario ya tiene sesión muestran "Ir al catálogo", si no muestran "Comenzar gratis" / "Crear cuenta gratis".

---

## 🎨 Paleta de colores

| Token | Color | Uso |
|---|---|---|
| `#3E2723` | Marrón muy oscuro | Navbar, hero, títulos principales |
| `#4E342E` | Marrón medio-oscuro | Gradientes intermedios |
| `#5D4037` | Marrón oscuro | Hover, gradientes, footer |
| `#6D4C41` | Marrón medio | Texto secundario, botones, labels |
| `#8D6E63` | Marrón suave | Texto terciario, descripciones, placeholders |
| `#BCAAA4` | Beige rosado | Inputs deshabilitados, placeholders |
| `#D7CCC8` | Beige grisáceo | Bordes de cards e inputs |
| `#EFEBE9` | Beige claro | Fondo de imagen en cards |
| `#F5F5F5` | Gris muy claro | Fondo general de páginas |
| `#FFA726` | Naranja ámbar | Estrellas de rating, CTAs destacados |
| `#FB8C00` | Naranja oscuro | Hover de CTAs ámbar |

---

## 👥 Trabajo en equipo

Este proyecto fue desarrollado en dos ramas paralelas:

| Persona | Rama | Responsabilidad |
|---|---|---|
| Persona 1 | `main` | AuthContext, Navbar, ProtectedRoute, LoginForm, RegisterForm |
| Persona 2 | `catalogo` | coffeeService, componentes coffee/ ui/ filters/, páginas del catálogo, LandingPage |
