FROM node:22-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @enterprise/api-contracts build
RUN pnpm --filter web build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/apps/web/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
