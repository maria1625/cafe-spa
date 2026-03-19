// Datos mock basados en el diseño Figma — sin dependencia de API externa

const mockCoffees = [
  { id: 1, brand: "LAVAZZA", name: "Selección Premium", origin: "Italia", type: "Mezcla Arábica", image: "https://images.unsplash.com/photo-1600709928661-3b4346d958cd?w=400&h=300&fit=crop", price: 24.99, rating: 4.7, votes: 142, available: true },
  { id: 2, brand: "ILLY", name: "Arabica 100% Puro", origin: "Brasil", type: "Grano Entero", image: "https://images.unsplash.com/photo-1644578238186-7527e7ab99b4?w=400&h=300&fit=crop", price: 32.50, rating: 4.9, votes: 567, available: true },
  { id: 3, brand: "SEGAFREDO", name: "Tostado Italiano", origin: "Italia", type: "Tostado Oscuro", image: "https://images.unsplash.com/photo-1767522247570-db1af0ae66af?w=400&h=300&fit=crop", price: 18.99, rating: 4.6, votes: 289, available: true },
  { id: 4, brand: "STARBUCKS", name: "Specialty Reserve", origin: "Guatemala", type: "Single Origin", image: "https://images.unsplash.com/photo-1584880368841-d9108694edbd?w=400&h=300&fit=crop", price: 28.75, rating: 4.5, votes: 421, available: false },
  { id: 5, brand: "JUAN VALDEZ", name: "Cumbre Volcán", origin: "Colombia", type: "Arábica Premium", image: "https://images.unsplash.com/photo-1672570050756-4f1953bde478?w=400&h=300&fit=crop", price: 22.50, rating: 4.8, votes: 356, available: true },
  { id: 6, brand: "NESPRESSO", name: "Vertuo Intenso", origin: "Suiza", type: "Cápsulas Premium", image: "https://images.unsplash.com/photo-1723356743747-2a34b778d4f4?w=400&h=300&fit=crop", price: 19.99, rating: 4.7, votes: 512, available: true },
  { id: 7, brand: "PEET'S COFFEE", name: "Major Dickason's", origin: "Estados Unidos", type: "Mezcla Especial", image: "https://images.unsplash.com/photo-1661668998418-ff67c6b0194e?w=400&h=300&fit=crop", price: 26.99, rating: 4.6, votes: 234, available: true },
  { id: 8, brand: "DUNKIN'", name: "Original Blend", origin: "Estados Unidos", type: "Mezcla Clásica", image: "https://images.unsplash.com/photo-1607109793107-4124730a011f?w=400&h=300&fit=crop", price: 15.99, rating: 4.3, votes: 678, available: true },
  { id: 9, brand: "LAVAZZA", name: "Qualità Oro", origin: "Italia", type: "Blend Italiano", image: "https://images.unsplash.com/photo-1558330677-0c0d26190651?w=400&h=300&fit=crop", price: 21.99, rating: 4.5, votes: 445, available: false },
  { id: 10, brand: "JUAN VALDEZ", name: "Colina Suave", origin: "Colombia", type: "Tostado Suave", image: "https://images.unsplash.com/photo-1611525487156-09d61b06a9ee?w=400&h=300&fit=crop", price: 13.99, rating: 4.6, votes: 367, available: true },
  { id: 11, brand: "ILLY", name: "Intenso Dark Roast", origin: "Brasil", type: "Tostado Oscuro", image: "https://images.unsplash.com/photo-1620472434832-b3ea9294e669?w=400&h=300&fit=crop", price: 21.99, rating: 4.8, votes: 756, available: true },
  { id: 12, brand: "NESPRESSO", name: "Kazaar Extra Intenso", origin: "Suiza", type: "Cápsulas Premium", image: "https://images.unsplash.com/photo-1666873903780-396269c73a54?w=400&h=300&fit=crop", price: 19.99, rating: 4.9, votes: 1123, available: true },
];
//
export const fetchCoffees = async () => {
  // Simula delay de red
  await new Promise((res) => setTimeout(res, 1200));
  //throw new Error("Error de prueba");
  return mockCoffees;
};