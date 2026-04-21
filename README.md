# Fullstack Enterprise Dashboard 🇬🇧

A professional showcase of a high-performance distributed system architecture. This project demonstrates engineering experience, built along 25 years, translated into modern web standards, focusing on scalability, type safety, and professional DX (Developer Experience).

## 🏗 Stack & Engineering

- **Monorepo Management:** [Turborepo](https://turbo.build) + [pnpm](https://pnpm.io) Workspaces for efficient build orchestration.
- **Frontend:** [Nuxt 4](https://nuxt.com) leveraging SSR, Nitro server, and modular layers.
- **Backend:** [NestJS](https://nestjs.com) with a modular architecture.
- **Database & ORM:** [Prisma 7](https://prisma.io) with PostgreSQL, featuring a shared database package architecture.
- **Type Safety:** Shared API Contracts (`@enterprise/api-contracts`) providing End-to-End type safety between Backend and Frontend.
- **Infrastructure:** Dockerised environment (PostgreSQL, Redis, Adminer) for seamless onboarding.

## 🎯 Key Architectural Decisions

- **Contract-First Development:** Shared TypeScript interfaces ensure that the Frontend and Backend are always in sync, failing at build-time rather than runtime.
- **Shared Database Layer:** The database logic is encapsulated in a dedicated internal package, allowing for better reusability and isolation.
- **Environment Robustness:** Centralised `.env` management with variable expansion (DRY principle) and Turborepo injection.

## 🚀 Getting Started

### Prerequisites
- Node.js v22.14.0+
- pnpm v9+
- Docker Desktop / Docker Compose

### Installation & Setup

1. **Clone this repository**

2. **Environment Configuration:**
  ```bash
  cp .env.example .env
  # Adjust variables as needed
  ```

3. **Install and Build:**
  ```bash
  pnpm install
  pnpm build
  ```

4. **Infrastructure:**
  ```bash
  docker-compose up -d
  ```

5. **Database Preparation:**
  ```bash
  pnpm --filter @enterprise/database db:push
  pnpm --filter @enterprise/database db:seed
  ```

6. **Run Development Mode:**
  ```bash
  pnpm dev
  ```

  Frontend: http://localhost:3000 | Backend: http://localhost:3001/api/v1


## 📁 Project Structure

- `apps/api`: NestJS core service (REST API).
- `apps/web`: Nuxt 4 application (Dashboard UI).
- `packages/database`: Centralised Prisma schema, migrations, and shared client.
- `packages/api-contracts`: Shared TypeScript interfaces and DTOs.
- `packages/typescript-config`: Shared TSConfig presets for consistent compilation rules.



Developed with a focus on UK Tech Market standards for code quality and software engineering.