# CONTEXTO PROYECTO — Persona 2 (Catálogo de cafés)

## Info general
- Proyecto: cafe-spa
- Repo: https://github.com/maria1625/cafe-spa
- Rama: catalogo
- Ruta local: C:\Users\eddua\Downloads\cafe-spa
- API: https://fake-coffee-api.vercel.app/api

## Lo que ya existe (compañero Persona 1)
- src/context/AuthContext.jsx
- src/components/Navbar.jsx
- src/components/ProtectedRoute.jsx
- src/pages/LoginPage.jsx
- src/pages/RegisterPage.jsx
- src/pages/Dashboard.jsx (vacío, yo lo reemplazo)

## Lo que debo crear yo (Persona 2)
- [ ] src/services/coffeeService.js
- [ ] src/components/coffee/CoffeeImage.jsx
- [ ] src/components/coffee/RatingStars.jsx
- [ ] src/components/coffee/PriceTag.jsx
- [ ] src/components/coffee/AvailabilityBadge.jsx
- [ ] src/components/coffee/CoffeeCard.jsx
- [ ] src/components/coffee/CoffeeList.jsx
- [ ] src/components/ui/Spinner.jsx
- [ ] src/components/ui/Loader.jsx
- [ ] src/components/ui/ErrorMessage.jsx
- [ ] src/components/ui/RetryButton.jsx
- [ ] src/pages/DashboardPage.jsx

## DISEÑO (extraído de Figma)

### Paleta de colores principal
- Fondo general: bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100
- Navbar: bg-gradient-to-r from-amber-900 to-amber-800, texto: text-amber-50
- Cards: bg-white, borde: border-amber-100, sombra: shadow-md hover:shadow-xl
- Imagen card: bg-amber-50, altura h-64
- Badge marca: bg-amber-600 text-white
- Título card: text-amber-950
- Rating: estrellas fill-amber-500 / text-amber-300
- Precio: text-amber-900 font-bold text-2xl
- Botón agregar disponible: bg-amber-700 hover:bg-amber-800 text-white
- Botón agregar agotado: bg-gray-300 text-gray-500
- Badge agotado: bg-red-600 text-white (overlay oscuro encima de imagen)
- FilterBar: bg-amber-50, border-amber-200
- Footer: bg-amber-900 text-amber-50

### CoffeeCard (código exacto del Figma)
```jsx
// Props: image, brandName, rating (0-5), votes, price, available
<div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full max-w-sm">
  {/* Imagen */}
  <div className="relative h-64 overflow-hidden bg-gray-100">
    <img src={image} alt={brandName}
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
  </div>
  {/* Contenido */}
  <div className="p-6">
    <h3 className="text-xl mb-3 text-gray-800">{brandName}</h3>
    {/* Estrellas: fill-yellow-400 llenas, fill-yellow-400/50 media, text-gray-300 vacías */}
    <div className="flex items-center gap-1 mb-2">
      {renderStars()} <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
    <p className="text-sm text-gray-500 mb-4">{votes} votos</p>
    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
      <span className="text-2xl text-gray-900">${price.toFixed(2)}</span>
      {/* Badge disponibilidad */}
      {available
        ? <span className="px-3 py-1.5 bg-green-100 text-green-700 text-sm rounded-full">Disponible</span>
        : <span className="px-3 py-1.5 bg-gray-200 text-gray-600 text-sm rounded-full">Agotado</span>
      }
    </div>
  </div>
</div>
```

### CoffeeList (grid)
- grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6

### FilterBar (código exacto del Figma)
```jsx
// Props: onlyAvailable, onOnlyAvailableChange, sortBy, onSortChange, onClearFilters
// SortOption: "price-asc" | "price-desc" | "rating" | "popular"
<div className="w-full bg-[#FEF7ED] border border-orange-200/40 rounded-lg shadow-sm px-6 py-4">
  <div className="flex flex-wrap items-center gap-6">
    {/* Ícono filtros */}
    <div className="flex items-center gap-2 text-orange-700">
      <Coffee className="size-5" />
      <span className="font-medium text-gray-800">Filtros</span>
    </div>
    {/* Checkbox */}
    <Checkbox id="only-available" checked={onlyAvailable}
      className="border-gray-400 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600" />
    <Label htmlFor="only-available" className="text-sm font-normal cursor-pointer text-gray-700">
      Solo disponibles
    </Label>
    {/* Select ordenar */}
    <div className="flex items-center gap-2 flex-1 min-w-[220px] max-w-[320px]">
      <ArrowUpDown className="size-4 text-orange-700" />
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-full border-orange-200/60 bg-white focus:ring-orange-600">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="popular">Más popular</SelectItem>
          <SelectItem value="price-asc">Precio menor a mayor</SelectItem>
          <SelectItem value="price-desc">Precio mayor a menor</SelectItem>
          <SelectItem value="rating">Mejor rating</SelectItem>
        </SelectContent>
      </Select>
    </div>
    {/* Limpiar */}
    <Button variant="ghost" size="sm" onClick={onClearFilters}
      className="gap-2 text-orange-700 hover:bg-orange-100/50 hover:text-orange-800 ml-auto">
      <X className="size-4" /> Limpiar filtros
    </Button>
  </div>
</div>
```

### ErrorMessage + RetryButton (código exacto del Figma)
```jsx
// Centrado en pantalla completa
<div className="flex items-center justify-center min-h-screen p-6">
  <div className="text-center max-w-md">
    {/* Ícono */}
    <div className="flex justify-center mb-6">
      <div className="rounded-full bg-red-50 p-6 inline-block">
        <AlertTriangle className="w-16 h-16 text-red-500" strokeWidth={1.5} />
      </div>
    </div>
    <h1 className="text-3xl font-semibold text-gray-900 mb-3">Error al cargar los cafés</h1>
    <p className="text-gray-500 mb-8 leading-relaxed">Recarga la página para intentar nuevamente</p>
    <button onClick={onRetry}
      className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md active:scale-95 transform">
      Reintentar
    </button>
  </div>
</div>
```

### Loader / Spinner (código exacto del Figma)
```jsx
// Fondo: bg-[#E8E4DC], centrado en pantalla completa
// Granos decorativos en el fondo (blobs con blur)
// Centro: círculo blanco con SVG de taza de café + anillo SVG animado girando
// Texto: "Cargando cafés..." color text-[#6B5B4A]
// 3 puntos animados con bounce escalonado (0ms, 150ms, 300ms)
// Animaciones personalizadas en tailwind.config:
//   animate-spin-slow: spin 3s linear infinite
//   animate-bounce-dot: bounce 1s ease-in-out infinite
<div className="relative size-full flex items-center justify-center bg-[#E8E4DC] overflow-hidden">
  {/* Blobs fondo - granos difuminados */}
  {/* SVG spinner ring animate-spin-slow alrededor de taza */}
  {/* Texto + 3 puntos bg-[#6B5B4A] animate-bounce-dot */}
</div>
```
⚠️ IMPORTANTE: Las animaciones `animate-spin-slow` y `animate-bounce-dot` deben agregarse al `tailwind.config.js`

### RatingStars (código exacto del Figma — catálogo)
```jsx
// Estrellas con llenado parcial proporcional usando clip por width %
// Íconos: lucide-react Star, color text-orange-400 / fill-orange-400
{Array.from({ length: 5 }, (_, i) => {
  const fillPercentage = Math.min(Math.max((rating - i) * 100, 0), 100);
  return (
    <div key={i} className="relative">
      <Star className="w-4 h-4 text-orange-400" />
      <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${fillPercentage}%` }}>
        <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
      </div>
    </div>
  );
})}
```

### CoffeeCard versión catálogo (con favorito y origen)
```jsx
// Props: coffee { id, brand, name, price, rating, votes, available, image, origin, type }
// Fondo general: bg-[#F5F5F0]
<div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
  <div className="relative overflow-hidden h-56 bg-gray-100">
    <img className="w-full h-full object-cover" />
    {/* Badge disponibilidad — arriba izquierda */}
    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium
      ${available ? "bg-green-500 text-white" : "bg-gray-500 text-white"}`}>
      {available ? "Disponible" : "Agotado"}
    </span>
    {/* Botón favorito — arriba derecha */}
    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
      <Heart className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"} />
    </button>
  </div>
  <div className="p-4">
    <h3 className="text-gray-900 font-medium text-sm mb-1 uppercase tracking-wide">{brand}</h3>
    <p className="text-gray-800 mb-1">{name}</p>
    <p className="text-sm text-gray-500 mb-3">{origin} - {type}</p>
    <div className="flex items-center gap-2">
      <RatingStars rating={rating} />
      <span className="text-xs text-gray-600">({votes})</span>
    </div>
  </div>
</div>
```

### DashboardPage (estructura)
```
<div min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100>
  <Navbar />
  <main max-w-7xl mx-auto px-4 py-8>
    <h1 text-4xl font-bold text-amber-950>Explora las mejores marcas de café</h1>
    <p text-amber-800>Descubre nuestra selección premium...</p>
    [mientras carga] → <Loader />
    [si error]       → <ErrorMessage /> + <RetryButton />
    [si ok]          → <CoffeeList coffees={data} />
  </main>
  <footer bg-amber-900 text-amber-50>
    © 2026 CoffeeHub
  </footer>
</div>
```

### Interfaz Coffee (datos de la API)
```js
{
  id: number,
  brand: string,
  name: string,
  image: string,
  rating: number,   // 1-5
  votes: number,
  price: number,
  available: boolean
}
```

## Tecnologías usadas
- React + Vite
- Tailwind CSS
- lucide-react (íconos: Star, ShoppingCart, AlertTriangle, Coffee, Menu, X)
- axios (fetch a la API)
- AuthContext (ya existe en src/context/AuthContext.jsx)

## Commits realizados
(marcar aquí a medida que avances)
- [ ] feat: add coffeeService with fetch, error and retry logic
- [ ] feat: add CoffeeImage component with fallback
- [ ] feat: add RatingStars component
- [ ] feat: add PriceTag component
- [ ] feat: add AvailabilityBadge component
- [ ] feat: add CoffeeCard component using all subcomponents
- [ ] feat: add CoffeeList grid component
- [ ] feat: add Spinner and Loader components
- [ ] feat: add ErrorMessage and RetryButton components
- [ ] feat: add DashboardPage with fetch, loader and error handling
- [ ] style: make all coffee and ui components fully responsive
