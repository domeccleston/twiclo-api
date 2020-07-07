const { PrismaClient } = require("@prisma/client");
const express = require("express");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();
const port = 1234;

app.use(express.json());
app.use(cors());

app.get(`/`, async (req, res) => {
  res.send("Up and running!");
});

app.post(`/users`, async (req, res) => {
  const result = await prisma.user.create({
    data: {
      ...req.body,
    },
  });
  res.status(200).json(result);
});

app.get(`/users`, async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.status(200).json(allUsers);
});

app.listen(port, () => {
  console.log(
    `\n
--------------------------------------------\n
Server running on port ${port}\n
--------------------------------------------\n`
  );
});
