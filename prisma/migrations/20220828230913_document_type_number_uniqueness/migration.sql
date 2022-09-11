/*
  Warnings:

  - A unique constraint covering the columns `[documentTypeId,documentNumber]` on the table `Person` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Person_documentTypeId_documentNumber_key" ON "Person"("documentTypeId", "documentNumber");
