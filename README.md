# CineServe

CineServe is a full-stack cinema reservation app. Visitors can browse movie screenings, check seat availability, and choose seats for a show. Registered users can manage their reservations and profile, while administrators can manage screenings and user accounts.

This project was built as a web development course assignment and is maintained as a portfolio project.

## Features

- Browse and filter movie screenings
- View screening details and available seats
- Register and sign in with role-based access
- Select seats and manage reservations
- Update user profile details
- Admin pages for managing screenings and users
- REST API documented with Swagger UI

## Tech stack

- **Frontend:** Vue 3, Vue Router, Pinia, Tailwind CSS, Vite
- **Backend:** Node.js, Express 5
- **Database:** SQLite with Sequelize
- **Authentication:** JSON Web Tokens
- **API docs:** OpenAPI and Swagger UI

## Getting started

Requirements: Node.js 22.18 or newer (or 24.12+).

Clone the repository, then install dependencies in each app:

```bash
cd server
npm install
cp .env.example .env.dev
npm run seed
npm run dev
```

In a second terminal, from the repository root:

```bash
cd client
npm install
npm run dev
```

Open the frontend at <http://localhost:5173>. The API runs at <http://localhost:3000>, and its interactive documentation is at <http://localhost:3000/api-docs>.

The seed command resets the development database and adds sample movies, halls, users, and reservations. It is intended for local development.

## Demo accounts

The seeded demo credentials are documented in [documentation/users.md](./documentation/users.md). They use sample passwords and are for local development only.

## Project structure

```text
client/          Vue frontend
server/          Express API, Sequelize models, and seed data
assignment/      Original course assignment brief
documentation/   Project notes and demo account details
```

## Useful commands

Run commands from the relevant `client/` or `server/` directory.

| Area | Command | Purpose |
| --- | --- | --- |
| Client | `npm run dev` | Start the Vite development server |
| Client | `npm run build` | Build the frontend for production |
| Client | `npm run lint` | Run client linters (may apply automatic fixes) |
| Server | `npm run dev` | Start the API in development mode |
| Server | `npm run seed` | Reset and populate the development database |
| Server | `npm test` | Run API tests with Vitest |
| Server | `npm run lint` | Run server linters |

## API

The API serves authentication, movie and screening, hall, user, and reservation endpoints. Explore the available routes and schemas through Swagger UI at `/api-docs` while the backend is running.
