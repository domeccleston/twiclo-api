import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    await prisma.user.create({
        data: {
            name: 'Alice',
            email: 'alice@prisma.io',
            posts: {
                create: { content: 'Hello World'},
            },
        }
    })


    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.disconnect();
  });
