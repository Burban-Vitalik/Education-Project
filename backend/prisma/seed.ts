import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password', 10);

  const users = [
    {
      email: 'user1@gmail.com',
      password: password,
    },
    {
      email: 'user2@gmail.com',
      password: password,
    },
  ];

  for (const user of users) {
    const existing = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existing) {
      await prisma.user.create({ data: user });
      console.log(`User ${user.email} created.`);
    } else {
      console.log(`User ${user.email} already exists.`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
