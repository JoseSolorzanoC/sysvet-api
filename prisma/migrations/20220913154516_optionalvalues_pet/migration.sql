-- DropForeignKey
ALTER TABLE "ClinicalConsultation" DROP CONSTRAINT "ClinicalConsultation_petId_fkey";

-- AlterTable
ALTER TABLE "ClinicalConsultation" ALTER COLUMN "petId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ClinicalConsultation" ADD CONSTRAINT "ClinicalConsultation_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
