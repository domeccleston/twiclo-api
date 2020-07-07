CREATE TABLE "public" . "User" (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE "public" . "Post" (
    id SERIAL PRIMARY KEY NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    content TEXT,
    published BOOLEAN NOT NULL DEFAULT FALSE,
    "authorId" INTEGER NOT NULL,
    FOREIGN KEY ("authorId") REFERENCES "public" . "User" (id)
)