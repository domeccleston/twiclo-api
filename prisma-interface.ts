import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // const newUser = await prisma.user.create({
    //     data: {
    //         name: 'Dom',
    //         email: 'domeccleston@gmail.com',
    //         password: 'hunter2'
    //     }
    // })
    // console.log(newUser)

    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
  }

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })