const { PrismaClient } = require("@prisma/client");
const express = require("express");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();
const port = 1234;

// app.use(express.json());

// app.get(`/`, async (req, res) => {
//     res.send("Up and running!")
// })

// app.get(`/users`, async (req, res) => {
//     const allUsers = await prisma.user.findMany();
//     res.status(200).json(allUsers)
// })

// app.listen(port, () => {
//     console.log(
// `\n
// --------------------------------------------\n
// Server running on port ${port}\n
// --------------------------------------------\n`
// )
// })

async function main() {
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
    console.log(1)
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.disconnect();
  });
