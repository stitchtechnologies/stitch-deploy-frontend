/*
  Warnings:

  - Made the column `readMe` on table `Service` required. This step will fail if there are existing NULL values in that column.
  - Made the column `script` on table `Service` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "readMe" SET NOT NULL,
ALTER COLUMN "readMe" DROP DEFAULT,
ALTER COLUMN "script" SET NOT NULL,
ALTER COLUMN "script" DROP DEFAULT;
