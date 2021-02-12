/*
  Warnings:

  - Made the column `name` on table `Group` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "name" SET NOT NULL;
