-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "id" SET DEFAULT uuid_generate_v1();

-- AlterTable
ALTER TABLE "Exchange" ALTER COLUMN "id" SET DEFAULT uuid_generate_v1();

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT uuid_generate_v1();
