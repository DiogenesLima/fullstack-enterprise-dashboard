# Scalable Backend Platform with Integrated Frontend Dashboard (NestJS, Prisma, Nuxt, Monorepo Architecture)

A modern backend platform designed to demonstrate scalable architecture, API design, and real-world system integration.

Built with production-level engineering practices, including authentication, data consistency, end-to-end type safety, and monorepo-based development.

<p align="center">
  <img src="https://github.com/user-attachments/assets/c92ccf15-ce3d-4f5a-9892-a231e21b91f1" alt="Enterprise Dashboard" width="800">
</p>

## 🚀 System Design Overview
This project simulates a real-world backend platform designed to handle typical operational challenges such as:
- API-driven workflows
- Data consistency across services
- Authentication and authorization
- Scalable data access patterns

It follows modular architecture principles and is structured for maintainability and future extensibility.

## 🏗 High-Level Tech Stack

- **Monorepo Management:** [Turborepo](https://turbo.build) + [pnpm](https://pnpm.io) Workspaces for efficient build orchestration.
- **Frontend:** [Nuxt 4](https://nuxt.com) leveraging SSR, Nitro server, modular layers, reactive getter patterns and composables.
- **Backend:** [NestJS](https://nestjs.com) with a modular architecture and versioned API.
- **Database & ORM:** [Prisma 7](https://prisma.io) with PostgreSQL, using optimized query patterns and a shared database package architecture
- **Type Safety:** Shared API Contracts (`@enterprise/api-contracts`) providing End-to-End type safety between Backend and Frontend.
- **Security:** JWT Authentication, Bcrypt hashing, and Rate Limiting (Throttler).
- **Quality Assurance:** [Vitest](https://vitest.dev/) for Unit/Component testing & [Swagger](https://swagger.io/) for OpenAPI docs.
- **Internationalization:** @nuxtjs/i18n with Lazy-loading and SEO-friendly prefix strategy
- **Observability:** Structured JSON Logging with [Pino](https://getpino.io).
- **Infrastructure:** Dockerised environment (PostgreSQL, Adminer) for seamless onboarding.

## 🎯 Engineering Highlights

- **End-to-End Type Safety:** Shared @enterprise/api-contracts package ensuring zero-drift between Backend and Frontend.
- **Shared Database Layer:** The database logic is encapsulated in a dedicated internal package, allowing for better reusability and isolation.
- **Frontend Architecture** Reusable stateless components, Skeleton loaders, and Debounced Search for optimal UX.
- **Automated Database Lifecycle:** Docker entrypoint.sh handles schema sync (db:push) and Faker.js seeding automatically on startup.
- **Resilient API:** Global ValidationPipes, ThrottlerGuards for brute-force protection, and Multi-stage Docker builds.
- **CI/CD Pipeline:** Automated GitHub Actions for Build, Lint, and Test (Backend & Frontend) with pnpm caching.
- **Environment Robustness:** Centralised `.env` management with variable expansion (DRY principle) and Turborepo injection.
- **Dynamic Multi-language Support:** Full localization (en-GB, pt-BR, es-ES) with real-time switching for UI, charts (Chart.js), and data formatting.
- **Stateful Navigation:** Search terms and pagination states are persisted across language changes using URL query synchronization.
- **Locale-Aware Middleware:** Automated redirection and authentication flows that respect the user's preferred language, even after session termination (logout).
- **Intl API Integration:** Native browser Intl API usage for performant and accurate date/currency formatting based on the active locale.

## 📁 Project Structure

- `apps/api`: NestJS REST API with Swagger, Pino logging, and JWT protection.
- `apps/web`: Nuxt 4 Dashboard with Tailwind CSS, Chart.js, and Reactive UI.
- `packages/database`: Centralised Prisma 7 schema and Faker.js seed engine.
- `packages/api-contracts`: Shared TypeScript interfaces and DTOs.
- `packages/typescript-config`: Shared TSConfig presets for consistent compilation rules.
- `.github/workflows`: CI pipeline configuration.

## 🚀 Getting Started

### Prerequisites
- Node.js v22.14.0+
- pnpm v9+
- Docker Desktop / Docker Compose

### 🛠 Setup & Running on Docker
**Environment:** `cp .env.example .env` \
**Install:** `pnpm install` \
**Up & Seed (One command):** `docker-compose up --build`
>This will automatically run migrations and seed 50+ users via Faker.js.


Frontend: http://localhost:3000 \
Backend: http://localhost:3001/api/v1 \
Backend Docs: http://localhost:3001/docs 

> [!IMPORTANT]
> **Default Credentials:**
> - **User:** `admin@enterprise.uk`
> - **Password:** `admin123`

> [!TIP]
> The system is fully localized. You can switch languages directly on the Login Page or via the Dashboard Header to see the reactive UI transformation.

### 🛠 Setup & Running for Dev

1. **Environment Configuration:**
  ```bash
  cp .env.example .env
  # Adjust variables as needed
  ```

2. **Install and Build:**
  ```bash
  pnpm install
  pnpm build
  ```

3. **Infrastructure (just database):**
  ```bash
  docker-compose up postgres -d
  ```

4. **Database Preparation:**
  ```bash
  pnpm --filter @enterprise/database db:push
  pnpm --filter @enterprise/database db:seed
  ```

5. **Run Development Mode:**
  ```bash
  pnpm dev
  ```

Designed to reflect modern software engineering practices commonly used in production environments.