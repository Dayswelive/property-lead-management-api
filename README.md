# 🏠 Property Lead Management API

A backend API for managing real estate property leads with authentication, lead lifecycle tracking, and dashboard analytics.

---

## ⚙️ Tech Stack

- Node.js + Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Zod (validation)
- Jest + Supertest (testing)

---

## 📁 Project Structure

```
src/
  app.ts
  server.ts
  config/
    env.ts
    prisma.ts
  middlewares/
    auth.middleware.ts
    error.middleware.ts
  utils/
    jwt.ts
    response.ts
  modules/
    auth/
    properties/
    leads/
    dashboard/
  tests/
```

---

## 🚀 Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd property-lead-management-api
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Create `.env` file:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/property_lead_management"
JWT_SECRET="supersecretkey"
PORT=3000
```

---

### 4. Run Migrations

```bash
npx prisma migrate dev --name init
```

---

### 5. Seed Database

```bash
npx prisma db seed
```

---

### 6. Start Server

```bash
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

## 🔑 Seeded Users

| Role  | Email                                           | Password    |
| ----- | ----------------------------------------------- | ----------- |
| Admin | [admin@example.com](mailto:admin@example.com)   | password123 |
| Agent | [agent1@example.com](mailto:agent1@example.com) | password123 |
| Agent | [agent2@example.com](mailto:agent2@example.com) | password123 |

---

## 🔐 Authentication

Use JWT token in headers:

```
Authorization: Bearer <token>
```

---

## 📌 API Endpoints

---

### 🧪 Health

```
GET /health
```

---

### 🔐 Auth

#### Login

```
POST /auth/login
```

Body:

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

---

### 🏠 Properties

#### Get Properties (with filters)

```
GET /properties
```

Query params:

- city
- minPrice
- maxPrice
- status
- page
- limit

Example:

```
GET /properties?city=Bangalore&minPrice=5000000
```

---

#### Get Property Details + Lead Summary

```
GET /properties/:id
```

Returns:

- Property details
- Leads grouped by status

---

### 📞 Leads

#### Create Lead

```
POST /leads
```

Rules:

- Property must exist
- Property must be Available
- Duplicate (phone + propertyId) not allowed

---

#### Get Leads

```
GET /leads
```

Filters:

- status
- priority
- agentId

---

#### Get Lead by ID

```
GET /leads/:id
```

---

#### Update Lead

```
PATCH /leads/:id
```

Allowed:

- priority
- notes

---

#### Lead Transition

```
POST /leads/:id/transition
```

Valid transitions:

```
New → Contacted
Contacted → Visited
Visited → Closed | Lost
```

Special rule:

- If Closed → property becomes `Booked`

---

### 📊 Dashboard

```
GET /dashboard/summary
```

Returns:

- Total leads
- Leads by status
- Leads by priority
- Conversion rate

---

## ⚠️ Business Rules

- No duplicate leads (same phone + property)
- Cannot create lead for booked property
- Strict transition pipeline enforced
- Closing a lead books the property

---

## 🧪 Testing

Run tests:

```bash
npm test
```

### Implemented Tests

✔ Valid transition (New → Contacted)
✔ Invalid transition (New → Visited)
✔ Duplicate lead rejection

---

## 📦 Scripts

```bash
npm run dev
npm run build
npm start
npm test
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

---

## 🧾 API Testing

You can use:

- Postman
- Thunder Client
- Curl

👉 Add Bearer token for protected routes

---

## 🧠 Design Decisions

- Clean architecture (controller → service → DB)
- Prisma for type-safe DB operations
- Transition logic isolated for clarity
- Middleware-based authentication
- Zod for validation

---

## 🚀 Future Improvements

- Swagger API documentation
- Role-based access control
- Pagination metadata
- Soft deletes
- Docker setup
- Separate test database

---

## 👨‍💻 Author

Built as part of backend engineering assignment.
