# DevLocker v1 - Gestor Privado de Snippets de Código

## 📋 Descripción

DevLocker v1 es una API REST que permite a los programadores almacenar y gestionar fragmentos de código (snippets) de forma privada y segura. Cada usuario solo puede ver, editar y borrar sus propios snippets.

### 🔒 Seguridad Implementada

- **JWT Authentication**: Autenticación basada en tokens JWT
- **Password Hashing**: Contraseñas hasheadas con bcryptjs
- **Muro de Privacidad**: Un usuario NUNCA puede acceder a snippets de otros usuarios
- **Validación de Entrada**: Validación con express-validator en todos los endpoints
- **Manejo de Errores**: Middleware centralizado para captura y respuesta de errores

---

## 🚀 Instalación y Configuración

### Requisitos Previos

- Node.js v18+
- MongoDB (Local o Atlas)
- npm o yarn

### Pasos de Instalación

1. **Clonar o descargar el repositorio**

```bash
cd backend
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Editar el archivo `.env`:

```env
MONGO_URI=mongodb://localhost:27017/cafe-spa
PORT=3000
JWT_SECRET=your_secure_jwt_secret_key_change_in_production_2024
```

4. **Iniciar MongoDB**

```bash
# Local
mongod

# O usar MongoDB Atlas (cambiar MONGO_URI en .env)
```

5. **Ejecutar el servidor**

```bash
# Modo producción
npm start

# Modo desarrollo (con auto-reload)
npm run dev
```

El servidor estará disponible en: `http://localhost:3000`

---

## 📚 Endpoints de DevLocker v1

### 🔐 Autenticación

#### POST `/api/v1/auth/register`

Registrar un nuevo usuario.

**Request:**

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

#### POST `/api/v1/auth/login`

Iniciar sesión de usuario.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 📝 Snippets (⚠️ Requieren Autenticación JWT)

Todos los endpoints de snippets requieren el header:

```
Authorization: Bearer <token>
```

#### POST `/api/v1/snippets`

Crear un nuevo snippet.

**Request:**

```json
{
  "title": "Función de suma",
  "language": "javascript",
  "code": "const sum = (a, b) => a + b;",
  "tags": ["math", "basics"],
  "description": "Simple sum function"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Snippet created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "user@example.com"
    },
    "title": "Función de suma",
    "language": "javascript",
    "code": "const sum = (a, b) => a + b;",
    "tags": ["math", "basics"],
    "description": "Simple sum function",
    "createdAt": "2024-05-07T16:30:00Z",
    "updatedAt": "2024-05-07T16:30:00Z"
  }
}
```

---

#### GET `/api/v1/snippets`

Listar todos los snippets del usuario actual.

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "user": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "user@example.com"
      },
      "title": "Función de suma",
      "language": "javascript",
      "code": "const sum = (a, b) => a + b;",
      "tags": ["math", "basics"],
      "createdAt": "2024-05-07T16:30:00Z",
      "updatedAt": "2024-05-07T16:30:00Z"
    }
  ],
  "count": 1
}
```

---

#### GET `/api/v1/snippets/:id`

Obtener un snippet específico (solo si pertenece al usuario).

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "user@example.com"
    },
    "title": "Función de suma",
    "language": "javascript",
    "code": "const sum = (a, b) => a + b;",
    "tags": ["math", "basics"],
    "createdAt": "2024-05-07T16:30:00Z",
    "updatedAt": "2024-05-07T16:30:00Z"
  }
}
```

**Error (403) - Acceso denegado:**

```json
{
  "success": false,
  "message": "Not authorized to access this snippet"
}
```

---

#### PUT `/api/v1/snippets/:id`

Editar un snippet (solo si pertenece al usuario).

**Request:**

```json
{
  "title": "Función de suma mejorada",
  "language": "javascript",
  "code": "const sum = (a, b) => { console.log(a, b); return a + b; }",
  "tags": ["math", "utilities"]
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Snippet updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "user@example.com"
    },
    "title": "Función de suma mejorada",
    "language": "javascript",
    "code": "const sum = (a, b) => { console.log(a, b); return a + b; }",
    "tags": ["math", "utilities"],
    "createdAt": "2024-05-07T16:30:00Z",
    "updatedAt": "2024-05-07T16:35:00Z"
  }
}
```

---

#### DELETE `/api/v1/snippets/:id`

Borrar un snippet (solo si pertenece al usuario).

**Response (200):**

```json
{
  "success": true,
  "message": "Snippet deleted successfully"
}
```

**Error (403) - Acceso denegado:**

```json
{
  "success": false,
  "message": "Not authorized to delete this snippet"
}
```

---

## 🔥 Prueba de Fuego: Validando el "Muro de Privacidad"

### Escenario: Intentar acceder a snippets de otro usuario

#### Paso 1: Registrar User A

```bash
POST /api/v1/auth/register
{
  "email": "userA@example.com",
  "name": "User A",
  "password": "password123"
}
```

**Guardar el token de User A**: `TOKEN_A`

#### Paso 2: Registrar User B

```bash
POST /api/v1/auth/register
{
  "email": "userB@example.com",
  "name": "User B",
  "password": "password456"
}
```

**Guardar el token de User B**: `TOKEN_B`

#### Paso 3: User A crea un snippet

```bash
POST /api/v1/snippets
Authorization: Bearer TOKEN_A
{
  "title": "Mi código secreto",
  "language": "python",
  "code": "print('Este es secreto')",
  "tags": ["private"]
}
```

**Guardar el ID del snippet**: `SNIPPET_ID`

#### Paso 4: ❌ User B intenta BORRAR el snippet de User A

```bash
DELETE /api/v1/snippets/SNIPPET_ID
Authorization: Bearer TOKEN_B
```

**Resultado esperado (403 Forbidden):**

```json
{
  "success": false,
  "message": "Not authorized to delete this snippet"
}
```

#### Paso 5: ❌ User B intenta EDITAR el snippet de User A

```bash
PUT /api/v1/snippets/SNIPPET_ID
Authorization: Bearer TOKEN_B
{
  "title": "Código modificado"
}
```

**Resultado esperado (403 Forbidden):**

```json
{
  "success": false,
  "message": "Not authorized to update this snippet"
}
```

#### Paso 6: ❌ User B intenta VER el snippet de User A

```bash
GET /api/v1/snippets/SNIPPET_ID
Authorization: Bearer TOKEN_B
```

**Resultado esperado (403 Forbidden):**

```json
{
  "success": false,
  "message": "Not authorized to access this snippet"
}
```

#### Paso 7: ✅ User B lista SUS propios snippets

```bash
GET /api/v1/snippets
Authorization: Bearer TOKEN_B
```

**Resultado esperado (200):**

```json
{
  "success": true,
  "data": [],
  "count": 0
}
```

*(User B no puede ver snippets de User A)*

---

## 📊 Estructura de Base de Datos

### Modelo: User

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

### Modelo: Snippet

```javascript
{
  _id: ObjectId,
  user: ObjectId (referencia a User),
  title: String (min: 3 chars),
  language: String (enum: javascript, python, java, css, html, sql, typescript, react, node, other),
  code: String (obligatorio),
  tags: [String],
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🛠️ Tecnologías Utilizadas

- **Node.js** + **Express.js**: Servidor HTTP
- **MongoDB** + **Mongoose**: Base de datos NoSQL
- **JWT (jsonwebtoken)**: Autenticación basada en tokens
- **bcryptjs**: Hash de contraseñas
- **express-validator**: Validación de entrada
- **CORS**: Control de acceso entre dominios

---

## ✅ Checklist de Seguridad

- ✅ JWT para autenticación
- ✅ Contraseñas hasheadas con bcryptjs
- ✅ Validación de entrada en todos los endpoints
- ✅ Muro de privacidad: Un usuario NO puede acceder a snippets de otros
- ✅ Middleware de error centralizado
- ✅ asyncHandler para captura de errores asíncronos
- ✅ El ID del usuario se extrae del JWT (req.user._id), NO del body
- ✅ Respuestas JSON consistentes

---

## 📝 Notas de Desarrollo

- Cambiar `JWT_SECRET` en `.env` por una clave segura en producción
- MongoDB debe estar corriendo antes de iniciar el servidor
- Los tokens JWT expiran en 7 días
- Para obtener un token, primero debes registrarte o hacer login

---

## 📧 Contacto

Para preguntas o soporte sobre este proyecto, contacta al equipo de desarrollo.

**Fecha de Entrega**: Próximo jueves
**Formato**: Trabajo en parejas
**Repositorio**: [Enlace a GitHub]
