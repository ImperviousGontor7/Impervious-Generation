# Impervious Generation

A full-stack web application for **Impervious Generation**, built with React, Vite, Express, and PostgreSQL.

The project is organized into a React frontend, an Express backend, and a PostgreSQL database managed through Prisma ORM.

**Repository:** [Impervious-Generation](https://github.com/ImperviousGontor7/Impervious-Generation)

---

## Tech Stack

| Category | Technology |
| Frontend | React 19 |
| Build Tool | Vite 7 |
| Routing | React Router |
| Styling | Tailwind CSS 4 |
| Backend | Node.js, Express 5 |
| Database | PostgreSQL |
| ORM | Prisma 6 |
| Authentication | JWT, bcrypt |
| Validation | Zod |
| Real-time | Socket.IO |
| API Documentation | Swagger |
| Testing | Vitest, Supertest, Playwright |

## Project Structure

```text
Impervious-Web/
├── client/                 # React frontend
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── features/
│       ├── pages/
│       └── styles/
│
├── server/                 # Express backend
│   ├── api/
│   ├── auth/
│   ├── config/
│   ├── constants/
│   ├── data/
│   ├── middlewares/
│   ├── modules/
│   ├── routes/
│   ├── sockets/
│   ├── storage/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── prisma/                 # Database schema and migrations
├── shared/                 # Shared application resources
├── docs/                   # Project documentation
├── tests/                  # Test suites, if configured
├── docker-compose.yml
├── package.json
└── README.md
```

## Requirements

Before running the project, make sure you have:

- Node.js 22 or newer.
- npm 10 or newer.
- PostgreSQL.
- Git.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ImperviousGontor7/Impervious-Generation.git

cd Impervious-Generation
```

### 2. Install dependencies

Install the project dependencies from the root directory:

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment files:

```bash
cp .env.example .env
cp client/.env.example client/.env
```

Configure the required values using the example files as references.

The Prisma database connection uses:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME"
```

Replace the placeholders with your own local PostgreSQL credentials and database name.

**Security:** Never commit real `.env` files, passwords, API keys, or authentication secrets to GitHub.

### 4. Generate Prisma Client

```bash
npm run prisma:generate
```

### 5. Run database migrations

For local development:

```bash
npm run prisma:migrate
```

Make sure PostgreSQL is running and the database connection is configured before executing migrations.

## Running the Application

Start both frontend and backend in development mode:

```bash
npm run dev
```

The project also provides individual commands:

```bash
npm run dev:client
npm run dev:server
```

## Available Scripts

| Command | Description |
| `npm run dev` | Start frontend and backend |
| `npm run dev:client` | Start Vite frontend |
| `npm run dev:server` | Start Express backend |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview frontend production build |
| `npm start` | Start backend server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest |
| `npm run test:unit` | Run unit tests |
| `npm run test:api` | Run API tests |
| `npm run test:e2e` | Run Playwright tests |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:validate` | Validate Prisma schema |
| `npm run prisma:studio` | Open Prisma Studio |
| `npm run prisma:migrate` | Run development migrations |
| `npm run prisma:migrate:deploy` | Apply existing migrations |

## Database

Impervious Generation uses PostgreSQL with Prisma ORM.

The Prisma schema is located at:

```text
prisma/schema.prisma
```

Useful database commands:

```bash
npm run prisma:validate
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
```

## Development Notes

- The project uses JavaScript and ES Modules.
- Frontend and backend dependencies are managed through the root `package.json`.
- Environment configuration is kept outside version control.
- Database migrations are managed through Prisma.
- Local development runs the frontend and backend concurrently.

## License

ISC — see the project package metadata for license information.
