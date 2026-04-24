# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @enterprise/database build
RUN pnpm --filter @enterprise/api-contracts build
RUN pnpm --filter api build

ENV NODE_ENV=production

EXPOSE 3001

COPY apps/api/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
