const request = require('supertest');
const API = require('./index.ts');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

describe('Test basic API functionality', () => {
  test('Should respond to root GET method', async () => {
    const response = await request(API).get('/');
    expect(response.statusCode).toBe(200);
  });

  test('User can register', async () => {
    const dummyUser = {
      email: 'ishmael@pequod.sea',
      password: 'callmeishmael',
    };
    const preTest = await prisma.user.delete({
      where: { email: 'ishmael@pequod.sea' },
    });
    const response = await request(API).post('/register').send(dummyUser);
    expect(response.statusCode).toBe(200);
  });
});
