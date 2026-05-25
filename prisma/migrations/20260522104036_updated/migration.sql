/*
  Warnings:

  - You are about to drop the `Sports` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sport` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sports" DROP CONSTRAINT "Sports_students_id_fkey";

-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "sport" TEXT NOT NULL;

-- DropTable
DROP TABLE "Sports";
