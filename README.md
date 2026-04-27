# Fullstack Enterprise Dashboard 🇬🇧

A professional showcase of a high-performance distributed system architecture. This project demonstrates engineering experience, built along 25 years, translated into modern web standards, focusing on scalability, type safety, and professional DX (Developer Experience).

<p align="center">
  <img src="https://github.com/user-attachments/assets/b39f15b9-7017-4745-85b9-72d152398bf8" alt="Enterprise Dashboard" width="800">
</p>


## 🏗 High-Level Tech Stack

- **Monorepo Management:** [Turborepo](https://turbo.build) + [pnpm](https://pnpm.io) Workspaces for efficient build orchestration.
- **Frontend:** [Nuxt 4](https://nuxt.com) leveraging SSR, Nitro server, modular layers, reactive getter patterns and composables.
- **Backend:** [NestJS](https://nestjs.com) with a modular architecture and versioned API.
- **Database & ORM:** [Prisma 7](https://prisma.io) with PostgreSQL (Optimized queries with skip/take and Promise.all aggregation), featuring a shared database package architecture.
- **Type Safety:** Shared API Contracts (`@enterprise/api-contracts`) providing End-to-End type safety between Backend and Frontend.
- **Security:** JWT Authentication, Bcrypt hashing, and Rate Limiting (Throttler).
- **Quality Assurance:** [Vitest](https://vitest.dev/) for Unit/Component testing & [Swagger](https://swagger.io/) for OpenAPI docs.
- **Observability:** Structured JSON Logging with [Pino](https://getpino.io).
- **Infrastructure:** Dockerised environment (PostgreSQL, Adminer) for seamless onboarding.

## 🎯 Advanced Engineering Features

- **End-to-End Type Safety:** Shared @enterprise/api-contracts package ensuring zero-drift between Backend and Frontend.
- **Shared Database Layer:** The database logic is encapsulated in a dedicated internal package, allowing for better reusability and isolation.
- **Clean Architecture UI:** Reusable stateless components, Skeleton loaders, and Debounced Search for optimal UX.
- **Automated Database Lifecycle:** Docker entrypoint.sh handles schema sync (db:push) and Faker.js seeding automatically on startup.
- **Resilient API:** Global ValidationPipes, ThrottlerGuards for brute-force protection, and Multi-stage Docker builds.
- **CI/CD Pipeline:** Automated GitHub Actions for Build, Lint, and Test (Backend & Frontend) with pnpm caching.
- **Environment Robustness:** Centralised `.env` management with variable expansion (DRY principle) and Turborepo injection.

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

Developed with a focus on UK Tech Market standards for code quality and software engineering.