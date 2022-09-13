/*
  Warnings:

  - Changed the type of `openedDate` on the `ClinicalConsultation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ClinicalConsultation" DROP COLUMN "openedDate",
ADD COLUMN     "openedDate" DATE NOT NULL;
