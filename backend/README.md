# Backend - Cafe Spa + DevLocker v1

## 📋 Descripción

Backend que incluye:
1. **API de Cafe Spa** - Catálogo de cafés con reseñas y favoritos
2. **DevLocker v1** - Gestor privado de snippets de código con seguridad JWT

---

## 🚀 Instalación Rápida

### 1. Instalar MongoDB
- **Windows**: Descarga desde [mongodb.com](https://www.mongodb.com/try/download/community)
- **Con Docker**: 
  ```bash
  docker run -d -p 27017:27017 --name mongodb mongo:latest
  ```

### 2. Configurar variables de entorno
El archivo `.env` ya está configurado:
```
MONGO_URI=mongodb://localhost:27017/cafe-spa
PORT=3000
JWT_SECRET=your_secure_jwt_secret_key_change_in_production_2024
```

Cambios opcionales:
- Si usas **MongoDB Atlas** (cloud), reemplaza `MONGO_URI` por tu connection string
- Cambia `JWT_SECRET` por una clave más segura en producción

### 3. Instalar dependencias
```bash
npm install
```

### 4. Ejecutar el servidor
```bash
npm run dev  # Desarrollo con hot reload
npm start    # Producción
```

**URL del servidor:** `http://localhost:3000`

---

## 📚 APIs Disponibles

### Cafe Spa (Existente)
- `GET /api/cafes` - Obtener todos los cafés
- `POST /api/cafes/:id/vote` - Votar por un café
- `POST /api/cafes/:id/reviews` - Agregar reseña
- `GET /api/favorites/:email` - Obtener favoritos
- `POST /api/favorites/toggle` - Agregar/quitar favorito

### DevLocker v1 (Nueva - Autenticación JWT)

#### Autenticación (Pública)
- `POST /api/v1/auth/register` - Registrar usuario
- `POST /api/v1/auth/login` - Iniciar sesión

#### Snippets (Privada - Requiere JWT)
- `GET /api/v1/snippets` - Listar tus snippets
- `POST /api/v1/snippets` - Crear snippet
- `GET /api/v1/snippets/:id` - Obtener snippet
- `PUT /api/v1/snippets/:id` - Editar snippet
- `DELETE /api/v1/snippets/:id` - Borrar snippet

Para endpoints privados, incluir header:
```
Authorization: Bearer <token>
```

---

## 📂 Estructura de Base de Datos

### Colecciones

#### Users
```javascript
{
  _id: ObjectId,
  email: String (unique),
  name: String,
  password: String (hashed),
  favorites: [ObjectId] (referencias a Cafe),
  createdAt: Date,
  updatedAt: Date
}
```

#### Snippets
```javascript
{
  _id: ObjectId,
  user: ObjectId (referencia a User),
  title: String (min: 3 chars),
  language: String,
  code: String,
  tags: [String],
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Cafes (Existente)
Catálogo de cafés con reseñas

#### Reviews (Existente)
Reseñas de cafés

---

## 🔒 Seguridad DevLocker v1

### Características Clave

✅ **JWT Authentication** - Tokens seguros para cada usuario
✅ **Password Hashing** - bcryptjs para cifrar contraseñas
✅ **Muro de Privacidad** - Un usuario NO puede ver snippets de otros
✅ **Validación de Entrada** - express-validator en todos los endpoints
✅ **Error Handling** - Middleware centralizado

### Regla de Oro

El `user._id` se extrae del **JWT**, NUNCA del body de la request.

```javascript
// ✅ CORRECTO
const userId = req.user._id;  // Del JWT

// ❌ INCORRECTO
const userId = req.body.userId;  // VULNERABLE
```

---

## 📝 Documentación Completa

Para documentación detallada, ver:
- **DevLocker v1**: [DEVLOCKER_README.md](./DEVLOCKER_README.md)
- **Documento Técnico**: [DOCUMENTO_TECNICO.md](./DOCUMENTO_TECNICO.md)

---

## 🧪 Pruebas

### Con Postman

Importar colección:
```
DevLocker-Postman-Collection.json
```

### Automatizadas

```bash
node test-devlocker.js
```

Ejecuta todas las pruebas de seguridad y funcionalidad.

---

## 🛠️ Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|----------|
| Node.js | 18+ | Runtime |
| Express | ^5.2.1 | Framework HTTP |
| MongoDB | 4.0+ | Base de datos |
| Mongoose | ^9.6.1 | ODM |
| JWT | ^9.0.2 | Autenticación |
| bcryptjs | ^2.4.3 | Hashing |
| express-validator | ^7.0.0 | Validación |

---

## 📁 Estructura de Carpetas

```
backend/
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   └── snippetController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   ├── Snippet.js
│   ├── Cafe.js
│   └── Review.js
├── routes/
│   ├── auth.js
│   └── snippets.js
├── .env
├── .gitignore
├── server.js
├── package.json
├── DEVLOCKER_README.md
├── DOCUMENTO_TECNICO.md
└── test-devlocker.js
```

---

## 🚨 Pasos para Levantar el Proyecto

1. **Clonar repositorio**
   ```bash
   git clone <url-repositorio>
   cd backend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar MongoDB**
   - Asegúrate que MongoDB está corriendo en `localhost:27017`
   - O configura una conexión a MongoDB Atlas en `.env`

4. **Ejecutar servidor**
   ```bash
   npm run dev
   ```

5. **Probar API**
   - Importar `DevLocker-Postman-Collection.json` en Postman
   - O ejecutar `node test-devlocker.js` para pruebas automatizadas

---

## ✅ Checklist de Deployment

- ✅ MongoDB está corriendo
- ✅ Variables de entorno configuradas en `.env`
- ✅ Dependencias instaladas con `npm install`
- ✅ JWT_SECRET cambiado (producción)
- ✅ Node.js v18+ disponible

---

## 📧 Contacto / Soporte

Para preguntas sobre el proyecto, contacta al equipo de desarrollo.

**Fecha de Entrega**: Próximo jueves
**Formato**: Trabajo en parejas

---

*Backend de Cafe Spa + DevLocker v1 - Mayo 2024*