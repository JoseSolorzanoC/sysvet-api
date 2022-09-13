/*
  Warnings:

  - A unique constraint covering the columns `[id,clinicalConsultationId]` on the table `ClinicalConsultationTreatment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ClinicalConsultationTreatment_clinicalConsultationId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ClinicalConsultationTreatment_id_clinicalConsultationId_key" ON "ClinicalConsultationTreatment"("id", "clinicalConsultationId");
