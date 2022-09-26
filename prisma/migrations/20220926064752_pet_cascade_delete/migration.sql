-- DropForeignKey
ALTER TABLE "AppointmentPets" DROP CONSTRAINT "AppointmentPets_petId_fkey";

-- DropForeignKey
ALTER TABLE "ClinicalConsultation" DROP CONSTRAINT "ClinicalConsultation_petId_fkey";

-- AddForeignKey
ALTER TABLE "AppointmentPets" ADD CONSTRAINT "AppointmentPets_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicalConsultation" ADD CONSTRAINT "ClinicalConsultation_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
