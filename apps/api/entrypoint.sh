#!/bin/sh

set -e # Abort on error

echo "🚀 Starting Enterprise Environment Setup..."

echo "📦 Running: prisma db push..."
pnpm --filter @enterprise/database db:push

echo "🌱 Running: prisma db seed..."
pnpm --filter @enterprise/database db:seed

echo "✅ Database is ready. Starting NestJS..."
exec node apps/api/dist/main
