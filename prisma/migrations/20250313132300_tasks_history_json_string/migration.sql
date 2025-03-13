/*
  Warnings:

  - Made the column `previous_values` on table `projects_history` required. This step will fail if there are existing NULL values in that column.
  - Made the column `new_values` on table `projects_history` required. This step will fail if there are existing NULL values in that column.
  - Made the column `previous_values` on table `tasks_history` required. This step will fail if there are existing NULL values in that column.
  - Made the column `new_values` on table `tasks_history` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "projects_history" ALTER COLUMN "previous_values" SET NOT NULL,
ALTER COLUMN "previous_values" SET DATA TYPE TEXT,
ALTER COLUMN "new_values" SET NOT NULL,
ALTER COLUMN "new_values" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tasks_history" ALTER COLUMN "previous_values" SET NOT NULL,
ALTER COLUMN "previous_values" SET DATA TYPE TEXT,
ALTER COLUMN "new_values" SET NOT NULL,
ALTER COLUMN "new_values" SET DATA TYPE TEXT;
