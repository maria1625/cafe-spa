import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Logger para depuración
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Cafe API is running');
});

// --- BASE DE DATOS MOCK (En memoria) ---
let cafes = [
  {
    id: 1,
    name: "Brazilian Santos",
    brand: "Tropical Beans",
    description: "Sabor suave con bajo nivel de acidez y notas dulces",
    origin: "Brasil",
    roast: "Claro",
    price: 14.99,
    rating: 4.4,
    votes: 156,
    available: false,
    imageUrl: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=800&q=80",
    reviews: []
  },
  {
    id: 2,
    name: "Colombian Supremo",
    brand: "Café del Valle",
    description: "Equilibrado con notas de caramelo, nuez y chocolate",
    origin: "Colombia",
    roast: "Medio",
    price: 16.5,
    rating: 4.6,
    votes: 189,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80",
    reviews: []
  },
  {
    id: 3,
    name: "Ethiopian Yirgacheffe",
    brand: "Premium Roasters",
    description: "Notas florales y cítricas con cuerpo ligero y elegante",
    origin: "Etiopía",
    roast: "Medio",
    price: 18.99,
    rating: 4.8,
    votes: 245,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    reviews: []
  },
  {
    id: 4,
    name: "Sumatra Mandheling",
    brand: "Asian Roasters",
    description: "Cuerpo pesado, terroso y notas de chocolate oscuro intenso",
    origin: "Indonesia",
    roast: "Oscuro",
    price: 15.75,
    rating: 4.6,
    votes: 210,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    reviews: []
  },
  {
    id: 5,
    name: "Guatemalan Antigua",
    brand: "Maya Coffee",
    description: "Aroma complejo con toques especiados y ahumados únicos",
    origin: "Guatemala",
    roast: "Medio",
    price: 17.25,
    rating: 4.5,
    votes: 132,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&w=800&q=80",
    reviews: []
  },
  {
    id: 6,
    name: "Kenya AA",
    brand: "Safari Beans",
    description: "Acidez brillante y notas de bayas silvestres frescas",
    origin: "Kenia",
    roast: "Claro",
    price: 19.50,
    rating: 4.9,
    votes: 312,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    reviews: []
  }
];

let userFavorites = {}; // { userId/email: [cafeIds] }

// --- RUTAS DE AUTENTICACIÓN ---
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  res.json({ user: { email, name: email.split('@')[0], token: 'fake-jwt-token' } });
});

app.post('/api/auth/register', (req, res) => {
  const { email, name } = req.body;
  res.json({ user: { email, name, token: 'fake-jwt-token' } });
});

// --- RUTAS DEL CATÁLOGO ---
app.get('/api/cafes', (req, res) => {
  res.json(cafes);
});

// --- RUTAS DE VOTOS ---
app.post('/api/cafes/:id/vote', (req, res) => {
  const id = parseInt(req.params.id);
  const cafe = cafes.find(c => c.id === id);
  if (cafe) {
    cafe.votes += 1;
    cafe.rating = Math.min(5, Number((cafe.rating + 0.01).toFixed(1)));
    res.json(cafe);
  } else {
    res.status(404).json({ error: 'Café no encontrado' });
  }
});

// --- RUTAS DE RESEÑAS ---
app.post('/api/cafes/:id/reviews', (req, res) => {
  const id = parseInt(req.params.id);
  const { userName, rating, comment } = req.body;
  const cafe = cafes.find(c => c.id === id);
  
  if (cafe) {
    const newReview = {
      id: Date.now(),
      userName,
      rating,
      comment,
      date: new Date().toLocaleDateString()
    };
    cafe.reviews.unshift(newReview);
    // Recalcular rating promedio
    cafe.rating = Number(((cafe.rating * cafe.votes + rating) / (cafe.votes + 1)).toFixed(1));
    cafe.votes += 1;
    res.json(cafe);
  } else {
    res.status(404).json({ error: 'Café no encontrado' });
  }
});

// --- RUTAS DE FAVORITOS ---
app.get('/api/favorites/:email', (req, res) => {
  const { email } = req.params;
  res.json(userFavorites[email] || []);
});

app.post('/api/favorites/toggle', (req, res) => {
  const { email, cafeId } = req.body;
  if (!userFavorites[email]) userFavorites[email] = [];
  
  const index = userFavorites[email].indexOf(cafeId);
  if (index === -1) {
    userFavorites[email].push(cafeId);
  } else {
    userFavorites[email].splice(index, 1);
  }
  res.json(userFavorites[email]);
});

try {
  app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
  });
} catch (error) {
  console.error('Error starting the server:', error);
}
