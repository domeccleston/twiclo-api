const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const usersSeed = [
  {
    name: 'Dom',
    email: 'domeccleston@gmail.com',
    password: 'admin1',
  },
  {
    name: 'Andrei',
    email: 'andrei@bolkonsky.ru',
    password: 'natalya2',
  },
  {
    name: 'Pierre',
    email: 'pierre@bezhukov.io',
    password: 'ih8napoleon',
  },
];

async function main() {
  usersSeed.forEach(async (user) => {
    await prisma.user.create({ data: user });
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.disconnect();
  });

export {};
