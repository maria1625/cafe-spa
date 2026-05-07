import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import Cafe from './models/Cafe.js';
import User from './models/User.js';
import Review from './models/Review.js';
import Snippet from './models/Snippet.js';
import snippetRoutes from './routes/snippets.js';
import authRoutes from './routes/auth.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const port = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

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

// Función para poblar datos iniciales
const seedDatabase = async () => {
  try {
    const count = await Cafe.countDocuments();
    if (count === 0) {
      const initialCafes = [
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
          imageUrl: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=800&q=80"
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
          imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80"
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
          imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
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
          imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
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
          imageUrl: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&w=800&q=80"
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
          imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
        }
      ];

      await Cafe.insertMany(initialCafes);
      console.log('Datos iniciales poblados en la base de datos');
    }
  } catch (error) {
    console.error('Error poblando la base de datos:', error);
  }
};

// Ejecutar seeding al iniciar
seedDatabase();

// --- RUTAS ---
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/snippets', snippetRoutes);

// --- RUTAS DEL CATÁLOGO ---
app.get('/api/cafes', async (req, res) => {
  try {
    const cafes = await Cafe.find().populate('reviews');
    res.json(cafes);
  } catch (error) {
    console.error('Error obteniendo cafés:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// --- RUTAS DE VOTOS ---
app.post('/api/cafes/:id/vote', async (req, res) => {
  try {
    const cafe = await Cafe.findOne({ id: parseInt(req.params.id) });
    if (!cafe) {
      return res.status(404).json({ error: 'Café no encontrado' });
    }

    cafe.votes += 1;
    cafe.rating = Math.min(5, Number((cafe.rating + 0.01).toFixed(1)));
    await cafe.save();

    res.json(cafe);
  } catch (error) {
    console.error('Error votando:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// --- RUTAS DE RESEÑAS ---
app.post('/api/cafes/:id/reviews', async (req, res) => {
  try {
    const { userName, rating, comment } = req.body;
    const cafe = await Cafe.findOne({ id: parseInt(req.params.id) });

    if (!cafe) {
      return res.status(404).json({ error: 'Café no encontrado' });
    }

    const newReview = new Review({
      userName,
      rating,
      comment,
      cafe: cafe._id
    });

    await newReview.save();

    // Agregar review al café y recalcular rating
    cafe.reviews.push(newReview._id);
    cafe.rating = Number(((cafe.rating * cafe.votes + rating) / (cafe.votes + 1)).toFixed(1));
    cafe.votes += 1;
    await cafe.save();

    // Devolver café con reviews pobladas
    const updatedCafe = await Cafe.findOne({ id: parseInt(req.params.id) }).populate('reviews');
    res.json(updatedCafe);
  } catch (error) {
    console.error('Error agregando reseña:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// --- RUTAS DE FAVORITOS ---
app.get('/api/favorites/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).populate('favorites');
    if (!user) {
      return res.json([]);
    }
    // Devolver los ids numéricos de los cafés favoritos
    res.json(user.favorites.map(fav => fav.id));
  } catch (error) {
    console.error('Error obteniendo favoritos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/favorites/toggle', async (req, res) => {
  try {
    const { email, cafeId } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        name: email.split('@')[0],
        password: 'fake-password'
      });
    }

    // Buscar el café por id numérico para obtener su _id
    const cafe = await Cafe.findOne({ id: parseInt(cafeId) });
    if (!cafe) {
      return res.status(404).json({ error: 'Café no encontrado' });
    }

    const cafeObjectId = cafe._id.toString();
    const index = user.favorites.indexOf(cafeObjectId);

    if (index === -1) {
      user.favorites.push(cafeObjectId);
    } else {
      user.favorites.splice(index, 1);
    }

    await user.save();
    res.json(user.favorites);
  } catch (error) {
    console.error('Error toggling favorito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Middleware de error global
app.use(errorHandler);

try {
  app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
  });
} catch (error) {
  console.error('Error starting the server:', error);
}
