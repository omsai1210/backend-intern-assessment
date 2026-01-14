# Backend Intern Assessment - Task Management System

A full-stack scalable Task Management application built with Node.js, Express, TypeScript, PostgreSQL, and React.

## 🎥 Demo
[Insert Demo Video Link Here]
*(or embed a GIF/Screenshot)*

## 🚀 Features

### Backend
- **Authentication**: Secure Registration & Login using JWT and Bcrypt.
- **RBAC (Role-Based Access Control)**: 
  - `User`: Manage own tasks.
  - `Admin`: Manage all tasks.
- **Validation**: Zod schema validation for all inputs.
- **Documentation**: Swagger UI integration.
- **Architecture**: Modular structure (Controllers, Routes, Middleware).

### Frontend
- **UI/UX**: Modern responsive design using Tailwind CSS.
- **Dashboard**: Protected route for task management.
- **Task Operations**: Create, Read, Update (Toggle Status), Delete.
- **Integration**: Axios with automatic token injection.

### Scalability & Security
- **Security Check**: Helmet, CORS, Type-safe database queries (Prisma).
- **Scalability**: See [SCALABILITY.md](./SCALABILITY.md) for detailed strategies.

## 🛠 Tech Stack

- **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL.
- **Frontend**: React, Vite, TypeScript, Tailwind CSS, Axios.
- **Tools**: Docker Compose, Swagger (OpenAPI).

## 📦 Setup & Installation

### Prerequisites
- Node.js (v16+)
- Docker Desktop (or local PostgreSQL)

### 1. Database Setup
Start the PostgreSQL container:
```bash
docker-compose up -d
```
Initialize the database schema:
```bash
cd backend
npx prisma migrate dev --name init
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Server runs at: `http://localhost:3000`  
API Documentation: `http://localhost:3000/api-docs`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
App runs at: `http://localhost:5173`

## 🧪 Method of Testing

1.  **Register**: Create a new account at `/login` (Toggle to Register).
2.  **Login**: Access the Dashboard.
3.  **Manage Tasks**: Add tasks, mark them as complete, or delete them.
4.  **Admin Testing**: (Optional) Manually update a user role to `admin` in DB to see all tasks.

## 📂 Project Structure

- `backend/`: API logic, Database models.
- `frontend/`: React UI components.
- `SCALABILITY.md`: Strategy for scaling the app.
