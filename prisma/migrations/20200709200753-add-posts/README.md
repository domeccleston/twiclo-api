# Migration `20200709200753-add-posts`

This migration has been generated by Dom Eccleston at 7/9/2020, 8:07:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"email" text  NOT NULL ,
"id" SERIAL,
"name" text   ,
"password" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Post" (
"author_id" integer  NOT NULL ,
"content" text  NOT NULL ,
"created" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"id" SERIAL,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("author_id")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200709190457-test-1..20200709200753-add-posts
--- datamodel.dml
+++ datamodel.dml
@@ -3,19 +3,22 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model User {
-  email    String  @unique
-  id       Int     @default(autoincrement()) @id
-  name     String?
-  password String
+  email       String    @unique
+  id          Int       @default(autoincrement()) @id
+  name        String?
+  password    String
+  posts       Post[]
 }
 model Post {
-  id        Int      @default(autoincrement()) @id
-  content   String
-  created   DateTime @default(now())
+  id          Int       @default(autoincrement()) @id
+  content     String
+  created     DateTime  @default(now())
+  author      User      @relation(fields: [author_id], references: [id])
+  author_id   Int
 }
```

