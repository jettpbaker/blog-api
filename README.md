# Blog API

A Node.js-based API for a full-stack blog project, built with Express and PostgreSQL.

## Features

- User authentication and authorization (JWT)
- Blog post management
- Comment system
- AI post description generation
- Docker containerization for easy deployment

## Prerequisites

- **PostgreSQL** If you are not using Docker to deploy, you will need a PostgreSQL database running locally, and you must provide the URL in the .env file
- **Environment variables** set in `.env` (see `.env.example` for required keys, e.g., `DATABASE_URL`, `JWT_SECRET`, `OPENROUTER_API_KEY`)
  > **Note:** If you do not have an OpenRouter key posts will be given a fallback description

If you want to interact with the API using the client you'll need the [Blog Client](https://github.com/jettpbaker/blog-client) running locally as well.

## Deployment Options

You have two options to run this application:

### Option 1: Docker

This is the easiest way to get started, especially if you're not familiar with the JavaScript ecosystem.

1. Make sure you have Docker and Docker Compose installed.
2. Clone the repository:
   ```bash
   git clone <repository-url>
   cd blog-api
   ```
3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
   - Edit `.env` to set your database URL, JWT secret, and OpenRouter API key.
4. Start the application:
   ```bash
   docker-compose up
   ```
5. The API will be available at `http://localhost:3000`

### Option 2: Local Development

If you want to run the app locally and make code changes:

1. Install prerequisites:
   - Node.js (latest LTS version)
   - pnpm (version 10.7.0 or higher)
2. Clone the repository:
   ```bash
   git clone <repository-url>
   cd blog-api
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
   - Edit `.env` to set your database URL, JWT secret, and OpenRouter API key.
5. Run Prisma Migrate:
   ```bash
   pnpm prisma migrate dev
   ```
6. Start the development server:
   ```bash
   pnpm dev
   ```
7. The API will be available at `http://localhost:3000`

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check code quality

## API Documentation

> **Note:** Endpoints requiring authentication expect a JWT in the `Authorization: Bearer <token>` header.

### Authentication & Users

| Endpoint            | Method | Description                          | Request Body                               | Auth Required |
| ------------------- | ------ | ------------------------------------ | ------------------------------------------ | ------------- |
| /api/users/login    | POST   | Login a user                         | `{ email, password }`                      | No            |
| /api/users/signup   | POST   | Register a new user                  | `{ firstName, lastName, email, password }` | No            |
| /api/users/me       | GET    | Get the authenticated user's profile | None                                       | Yes           |
| /api/users/me/admin | GET    | Check if user is admin               | None                                       | Yes           |
| /api/users/me/posts | GET    | Get posts for the authenticated user | None                                       | Yes           |

### Posts

| Endpoint                        | Method | Description                                   | Request Body                      | Auth Required |
| ------------------------------- | ------ | --------------------------------------------- | --------------------------------- | ------------- |
| /api/posts                      | GET    | Get all posts                                 | None                              | No            |
| /api/posts/:id                  | GET    | Get a specific post by ID (includes comments) | None                              | No            |
| /api/posts                      | POST   | Create a new post                             | `{ title, content, description }` | Yes           |
| /api/posts/:id                  | DELETE | Delete a post                                 | None                              | Yes           |
| /api/posts/:id                  | PATCH  | Update post content                           | `{ content }`                     | Yes           |
| /api/posts/:id/publish          | PATCH  | Toggle post publish status (admin only)       | None                              | Yes           |
| /api/posts/generate-description | POST   | Generate AI description                       | `{ postMarkdown }`                | No            |

### Comments

| Endpoint                    | Method | Description          | Request Body          | Auth Required |
| --------------------------- | ------ | -------------------- | --------------------- | ------------- |
| /api/posts/:postId/comments | POST   | Create a new comment | `{ content, postId }` | Yes           |
| /api/posts/comments/:id     | DELETE | Delete a comment     | None                  | Yes           |
