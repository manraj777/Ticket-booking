/*
  Warnings:

  - Added the required column `type` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AdminType" AS ENUM ('SuperAdmin', 'Creator');

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "type" "AdminType" NOT NULL;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "imageUrl" TEXT NOT NULL;
