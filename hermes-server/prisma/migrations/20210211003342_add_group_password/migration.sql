/*
  Warnings:

  - Added the required column `password` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "password" TEXT NOT NULL;
