const { PrismaClient } = require("@prisma/client");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const {
  Validator,
  ValidationError,
} = require("express-json-validator-middleware");
const generateToken = require('./utils/generate-token');

const prisma = new PrismaClient();
const app = express();
const validator = new Validator({ allErrors: true });
const validate = validator.validate;
const port = 1234;

app.use(express.json());
app.use(cors());

const registrationSchema = {
  type: "object",
  required: ["email", "password"],
};

app.get(`/`, async (req, res) => {
  res.send("Up and running!");
});

app.get(`/users`, async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
});

app.post(
  `/register`,
  validate({ body: registrationSchema }),
  async (req, res) => {
    const result = await prisma.user.create({
      data: {
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 14),
      },
    });
    res.json(result);
  }
);

app.post(`/login`, async (req, res) => {
    const user = await prisma.user.findOne({ where: { id: req.body.id } });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateToken(user.id)
        res.status(200).json(user)
    }
})

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(400).send("Invalid input");
    next();
  } else {
    next(err);
  }
});

app.listen(port, () => {
  console.log(
    `\n
--------------------------------------------\n
Server running on port ${port} 🚀\n 
--------------------------------------------\n`
  );
});
