import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  await prisma.user.createMany({
    data: [
      { name: 'Tomas Lopez', email: 'tomas_lopez@example.com', age: 30, password: hashedPassword },
      { name: 'Juan Peralta', email: 'juan_peralta@example.com', age: 25, password: hashedPassword },
    ],
  });

  console.log('Seed data has been inserted successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
