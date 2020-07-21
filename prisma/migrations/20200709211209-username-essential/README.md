# Migration `20200709211209-username-essential`

This migration has been generated by Dom Eccleston at 7/9/2020, 9:12:09 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"email" text  NOT NULL ,
"id" SERIAL,
"name" text  NOT NULL ,
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
migration 20200709200753-add-posts..20200709211209-username-essential
--- datamodel.dml
+++ datamodel.dml
@@ -3,15 +3,15 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model User {
   email       String    @unique
   id          Int       @default(autoincrement()) @id
-  name        String?
+  name        String
   password    String
   posts       Post[]
 }
```

