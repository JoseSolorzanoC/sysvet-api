-- CreateTable
CREATE TABLE "ClinicalConsultation" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "openedDate" TEXT NOT NULL,
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
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "ClinicalConsultation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClinicalConsultation" ADD CONSTRAINT "ClinicalConsultation_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
