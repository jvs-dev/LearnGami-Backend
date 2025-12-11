# Algoritmo Humano Backend

Backend for the Algoritmo Humano technical challenge - Course Management Platform with JWT Authentication.

## Features

- User authentication with JWT
- Course management (CRUD)
- Lesson management (CRUD)
- Public course catalog
- Role-based access control (USER/ADMIN)

## Tech Stack

- Node.js + Express.js
- SQLite with Prisma ORM
- JWT for authentication
- CORS enabled for cross-origin requests

## Prerequisites

- Node.js 16+
- npm

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secret_key_here"
PORT=3001
```

## Database Setup

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get authenticated user data
- `GET /api/auth/count` - Get total user count (admin only)

### Courses
- `GET /api/courses/public` - Get all public (active) courses
- `GET /api/courses/public/:id` - Get a specific public course
- `POST /api/courses` - Create a course (authenticated)
- `GET /api/courses` - Get all user's courses (authenticated)
- `GET /api/courses/:id` - Get a specific course (authenticated)
- `PUT /api/courses/:id` - Update a course (authenticated)
- `DELETE /api/courses/:id` - Delete a course (authenticated)

### Lessons
- `GET /api/lessons/public/course/:courseId` - Get all public lessons for a course
- `POST /api/lessons` - Create a lesson (authenticated)
- `GET /api/lessons/course/:courseId` - Get all lessons for a course (authenticated)
- `GET /api/lessons/:id` - Get a specific lesson (authenticated)
- `PUT /api/lessons/:id` - Update a lesson (authenticated)
- `DELETE /api/lessons/:id` - Delete a lesson (authenticated)

## Deployment to Render

This application is configured for deployment to Render. The `render.yaml` file contains the necessary configuration.

Important notes for deployment:
1. The application uses SQLite which is suitable for this challenge but not recommended for production
2. File uploads (if implemented) will not persist between deployments due to Render's ephemeral filesystem
3. The database file will be stored in the Render instance's filesystem

### Making a User Admin

To make a user an admin, use the provided script:

```bash
npm run make:admin <user_id>
```

## License

ISC