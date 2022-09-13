-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'DOCTOR');

-- CreateTable
CREATE TABLE "DocumentType" (
    "id" SERIAL NOT NULL,
    "documentName" TEXT NOT NULL,
    "documentType" VARCHAR(2) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "DocumentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "documentTypeId" INTEGER NOT NULL,
    "documentNumber" VARCHAR NOT NULL,
    "fullName" TEXT NOT NULL,
    "birthDate" DATE,
    "cellphone" CHAR(10),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetSpecie" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "PetSpecie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetRace" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "PetRace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "raceId" INTEGER,
    "specieId" INTEGER,
    "name" TEXT NOT NULL,
    "birthDate" DATE NOT NULL,
    "furColor" TEXT NOT NULL,
    "lastWeight" DOUBLE PRECISION DEFAULT 0,
    "photoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentPets" (
    "id" SERIAL NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "AppointmentPets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClinicalConsultation" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "openedDate" DATE NOT NULL,
    "anamnesis" TEXT NOT NULL,
    "petCf" DOUBLE PRECISION NOT NULL,
    "petRf" DOUBLE PRECISION NOT NULL,
    "petPulse" DOUBLE PRECISION NOT NULL,
    "petTemperature" DOUBLE PRECISION NOT NULL,
    "petConsultationWeight" DOUBLE PRECISION NOT NULL,
    "petAttitude" TEXT NOT NULL,
    "petCorporalCondition" TEXT NOT NULL,
    "petHidratationState" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ClinicalConsultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClinicalConsultationTreatment" (
    "id" TEXT NOT NULL,
    "clinicalConsultationId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "posology" TEXT NOT NULL,
    "totalDose" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ClinicalConsultationTreatment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentType_documentName_key" ON "DocumentType"("documentName");

-- CreateIndex
CREATE UNIQUE INDEX "Person_documentTypeId_documentNumber_key" ON "Person"("documentTypeId", "documentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_personId_key" ON "User"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ClinicalConsultationTreatment_id_clinicalConsultationId_key" ON "ClinicalConsultationTreatment"("id", "clinicalConsultationId");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "DocumentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "PetRace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_specieId_fkey" FOREIGN KEY ("specieId") REFERENCES "PetSpecie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentPets" ADD CONSTRAINT "AppointmentPets_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentPets" ADD CONSTRAINT "AppointmentPets_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicalConsultation" ADD CONSTRAINT "ClinicalConsultation_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicalConsultationTreatment" ADD CONSTRAINT "ClinicalConsultationTreatment_clinicalConsultationId_fkey" FOREIGN KEY ("clinicalConsultationId") REFERENCES "ClinicalConsultation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
