import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🇬🇧 Starting professional seeding with Faker.js...');

  const totalUsers = await prisma.user.count();

  if (totalUsers > 0) {
    console.log(`⚠️  Database already has ${totalUsers} users. Skipping seeding.`);
    return;
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('admin123', saltRounds);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@enterprise.uk' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'admin@enterprise.uk',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('Generating 50 random users...');

  const users = [];
  for (let i = 0; i < 50; i++) {
    const rawPassword = faker.internet.password({ length: 12 });
    const hashedPassword = await bcrypt.hash(rawPassword, saltRounds);

    users.push({
      email: faker.internet.email().toLowerCase(),
      password: hashedPassword,
      role: faker.helpers.arrayElement(['admin', 'user', 'user', 'user', 'user']),
      created: faker.date.past({ years: 1 }),
    });
  }

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  const total = await prisma.user.count();

  console.log('✅ Seed completed:');
  console.log(`   User: ${admin.email}`);
  console.log(`   Default Password: admin123 (stored as hash)`);
  console.log(`   Total Users: ${total}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1); 
  })
  .finally(async () => {
    await prisma.$disconnect(); 
  });
