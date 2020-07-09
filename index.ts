require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const {
  Validator,
  ValidationError,
} = require('express-json-validator-middleware');
const generateToken = require('./utils/generate-token');

const prisma = new PrismaClient();
const app = express();
const validator = new Validator({ allErrors: true });
const validate = validator.validate;
const port = 1234;

app.use(express.json());
app.use(cors());

const userSchema = {
  type: 'object',
  required: ['email', 'password'],
};

const postSchema = {
  type: 'object',
  required: ['content'],
};

app.get(`/`, async (req, res) => {
  res.send('Up and running!');
});

app.post(`/register`, validate({ body: userSchema }), async (req, res) => {
  const result = await prisma.user.create({
    data: {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 14),
    },
  });
  res.status(200).json(result);
});

app.post(`/login`, validate({ body: userSchema }), async (req, res) => {
  const user = await prisma.user.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.status(200).json({
      user,
      token: generateToken(user),
    });
  } else {
    res.status(401).json('Invalid credentials');
  }
});

app.post(`/posts`, validate({ body: postSchema }), async (req, res) => {
  const postCreated = await prisma.post.create({
    data: {
      content: req.body.content,
      author: {
        connect: { email: req.body.email },
      },
    },
  });
  res.status(200).send(postCreated);
});

app.get(`/posts`, async (req, res) => {
  const allPosts = await prisma.post.findMany();
  res.status(200).send(allPosts);
});

app.get(`/posts/:id`, async (req, res) => {
  const postsByAuthor = await prisma.post.findMany({
    where: {
      author_id: parseInt(req.params.id)
    }
  });
  res.status(200).send(postsByAuthor)
})


app.delete(`/posts/:id`, async (req, res) => {
  const postToDelete = await prisma.post.findOne({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.status(200).json({ message: 'Post deleted'});
})

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(400).send('Invalid input');
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

module.exports = app;
export {}; // I'm using ES5 imports, but Typescript needs an export statement to know this file is a module
