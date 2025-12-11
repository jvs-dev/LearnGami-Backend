# LearnGami Backend

Backend for the Algoritmo Humano technical challenge - Course Management Platform with JWT Authentication.

Live Deployment: https://learngami-backend.onrender.com

## 🎯 Objective

Develop a full-stack web application with user authentication and course management, demonstrating clean code architecture, clear architectural clarity, and professional delivery.

## ✨ Features Implemented

### 1. User Authentication
- User registration and login
- JWT-based authentication with 7-day token expiration
- Protected routes for authenticated areas
- Comprehensive validation and error handling

### 2. Course Management (Authenticated CRUD)
- Create courses with title, description, duration, image URL, and status
- List all user's courses
- Edit existing courses
- Delete courses

### 3. Lesson Management (Authenticated CRUD)
- Create lessons with name, description, cover image, video URL, and status
- List all lessons for a specific course
- Edit existing lessons
- Delete lessons

### 4. Public Course Catalog
- Public endpoint listing only active courses
- Public endpoint for course details with lessons
- Organized, responsive, and pleasant layout

### 5. Role-Based Access Control
- USER role for regular users
- ADMIN role for privileged users (manually assigned)
- Admin-only endpoint for user count statistics

## 🛠️ Tech Stack

- **Backend Framework**: Node.js + Express.js
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT (jsonwebtoken)
- **Security**: CORS enabled, SHA-256 password hashing
- **Deployment**: Render

## 📁 Project Structure

```
src/
├── controllers/     # Business logic handlers
├── middlewares/    # Authentication middleware
├── routes/         # API route definitions
├── utils/          # Utility functions (JWT, password)
└── server.js       # Main application entry point

prisma/
├── migrations/     # Database migration files
└── schema.prisma   # Database schema definition

scripts/            # Helper scripts
```

## ▶️ Installation & Setup

### Prerequisites
- Node.js 16+
- npm

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file based on `.env.example`:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secret_key_here"
PORT=3001
```

### Database Setup
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

## ▶️ Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get authenticated user data
- `GET /api/auth/count` - Get total user count (admin only)

### Courses
- `GET /api/courses/public` - Get all public (active) courses
- `GET /api/courses/public/:id` - Get a specific public course with lessons
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

## 🔐 Security Implementation

- JWT tokens include user role for authorization checks
- Passwords hashed with SHA-256 before storage
- Role elevation restricted to manual database updates
- CORS configured for cross-origin requests
- Input validation on all endpoints

## 👨‍💼 Admin Role Management

Admin users have access to special endpoints like user counting. To make a user an admin:

```bash
npm run make:admin <user_id>
```

Note: This must be done manually for security reasons.

## ☁️ Deployment

This application is deployed on Render at: https://learngami-backend.onrender.com

The `render.yaml` file contains the deployment configuration:
- Automatic installation of dependencies
- Prisma client generation and database migration on startup using `prisma migrate deploy` for production
- Dynamic port assignment via `process.env.PORT`

Important considerations:
1. SQLite is used for simplicity but is not recommended for production
2. File uploads (if implemented) will not persist between deployments
3. CORS is configured to allow all origins for development flexibility

## 🏗️ Architecture Decisions

1. **Clean Separation of Concerns**: Controllers handle business logic, routes manage endpoints, and middleware handles authentication
2. **Role-Based Access Control**: USER/ADMIN roles with strict elevation controls
3. **Extensible Design**: Easy to add new entities (modules, quizzes, etc.)
4. **RESTful API Design**: Consistent endpoint structure and HTTP status codes
5. **Error Handling**: Comprehensive error responses with appropriate HTTP codes

## 🧪 Development Process

The development process was accelerated using AI assistance for:
- Code snippet generation for faster implementation
- Code review to ensure adherence to development standards
- Resolution of complex issues related to CORS and application security

All code was carefully reviewed and tested to ensure quality and security standards were met.

## 📈 Future Enhancements (Differentials)

- [ ] Filter courses by status or search by title
- [ ] Implement pagination for course listings
- [ ] Add real image upload functionality with cloud storage
- [ ] Create unit tests for all endpoints
- [ ] Expand course model with modules and quizzes

## 📝 License

ISC

---
Developed as part of the Algoritmo Humano technical challenge