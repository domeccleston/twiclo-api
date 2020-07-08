# Twiclo

A CRUD API written in Typescript and Prisma.

## How to run this app

1. Run `npm install` to bring in dependencies.
2. Create a .env file in the root folder and add a key SECRET=<YOUR_SECRET>
3. Create a second .env file in the prisma folder and add a key DATABASE_URL=<YOUR_DATABASE_URL>
4. Run `npm start` to run the server on localhost.

## Database

The database for this app is defined in the Prisma/schema.prisma file. If you change the file, you'll
need to re-generate Prisma Client:

`npx prisma generate`

## Routes - work in progress

The 