const request = require('supertest');
const API = require('./index.ts');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

describe('Test basic API functionality', () => {
  const dummyUser = {
    email: 'ishmael@pequod.sea',
    password: 'callmeishmael',
  };


  test('Should respond to root GET method', async () => {
    const response = await request(API).get('/');
    expect(response.statusCode).toBe(200);
  });


  test('User can register', async () => {
    const preTest = await prisma.user.delete({
      where: { email: 'ishmael@pequod.sea' },
    });
    const response = await request(API)
    .post('/register')
    .send(dummyUser);

    expect(response.statusCode).toBe(200);
  });


  test('User can log in', async () => {
    const response = await request(API)
    .post('/login')
    .send(dummyUser)

    expect(response.statusCode).toBe(200);
  });

  test('User can add a post', async () => {
    // TODO: test POST /posts route
  })

  test('User can retrieve all posts', async () => {
    // TODO: test GET /posts route
  })

  test('User retrieve post by id', async () => {
    // TODO: test GET /posts/:id route
  })

  test('User can delete post by id', async () => {
    // TODO: test DELETE /posts/:id route
  })
});

export {}