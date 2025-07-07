/*
  Warnings:

  - You are about to drop the column `discription` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `SeatType` table. All the data in the column will be lost.
  - Added the required column `description` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `SeatType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SeatType" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT NOT NULL;
