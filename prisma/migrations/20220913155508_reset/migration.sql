/*
  Warnings:

  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AppointmentPets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClinicalConsultation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClinicalConsultationTreatment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DocumentType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PetRace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PetSpecie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AppointmentPets" DROP CONSTRAINT "AppointmentPets_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentPets" DROP CONSTRAINT "AppointmentPets_petId_fkey";

-- DropForeignKey
ALTER TABLE "ClinicalConsultation" DROP CONSTRAINT "ClinicalConsultation_petId_fkey";

-- DropForeignKey
ALTER TABLE "ClinicalConsultationTreatment" DROP CONSTRAINT "ClinicalConsultationTreatment_clinicalConsultationId_fkey";

-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_documentTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_raceId_fkey";

-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_specieId_fkey";

-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_personId_fkey";

-- DropTable
DROP TABLE "Appointment";

-- DropTable
DROP TABLE "AppointmentPets";

-- DropTable
DROP TABLE "ClinicalConsultation";

-- DropTable
DROP TABLE "ClinicalConsultationTreatment";

-- DropTable
DROP TABLE "DocumentType";

-- DropTable
DROP TABLE "Person";

-- DropTable
DROP TABLE "Pet";

-- DropTable
DROP TABLE "PetRace";

-- DropTable
DROP TABLE "PetSpecie";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Role";
