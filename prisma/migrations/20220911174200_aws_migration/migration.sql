-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_raceId_fkey";

-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_specieId_fkey";

-- AlterTable
ALTER TABLE "Pet" ALTER COLUMN "raceId" DROP NOT NULL,
ALTER COLUMN "specieId" DROP NOT NULL,
ALTER COLUMN "lastWeight" DROP NOT NULL;

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
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentPets" (
    "id" SERIAL NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "AppointmentPets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "PetRace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_specieId_fkey" FOREIGN KEY ("specieId") REFERENCES "PetSpecie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentPets" ADD CONSTRAINT "AppointmentPets_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentPets" ADD CONSTRAINT "AppointmentPets_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
