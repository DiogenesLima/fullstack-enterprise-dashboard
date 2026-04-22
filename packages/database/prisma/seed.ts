import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import * as bcrypt from 'bcrypt';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🇬🇧 Starting database seeding...');

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

  console.log('✅ Seed completed:');
  console.log(`   User: ${admin.email}`);
  console.log(`   Default Password: admin123 (stored as hash)`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1); 
  })
  .finally(async () => {
    await prisma.$disconnect(); 
  });
