# Backend API for Intern Assessment

## Tech Stack
- NodeJS, Express, TypeScript
- PostgreSQL with Prisma ORM
- Authentication: JWT, Bcrypt
- Validation: Zod
- Documentation: Swagger

## Setup
1. `npm install`
2. `docker-compose up -d`
3. `npx prisma migrate dev --name init`
4. `npm run dev`

## API Documentation
Visit `http://localhost:3000/api-docs` after starting the server.

## Features
- **User Auth**: Register/Login
- **RBAC**: Admin vs User
- **Task CRUD**: 
  - Users manage their own tasks.
  - Admins can view/delete all tasks.
