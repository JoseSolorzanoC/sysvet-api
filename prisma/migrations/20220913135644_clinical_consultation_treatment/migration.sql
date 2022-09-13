-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "ClinicalConsultation" ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "DocumentType" ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT true;

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
CREATE UNIQUE INDEX "ClinicalConsultationTreatment_clinicalConsultationId_key" ON "ClinicalConsultationTreatment"("clinicalConsultationId");

-- AddForeignKey
ALTER TABLE "ClinicalConsultationTreatment" ADD CONSTRAINT "ClinicalConsultationTreatment_clinicalConsultationId_fkey" FOREIGN KEY ("clinicalConsultationId") REFERENCES "ClinicalConsultation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
