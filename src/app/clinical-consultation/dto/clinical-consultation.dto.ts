export interface ClinicalConsultationDto {
  petId: string;
  reason: string;
  openedDate: Date;
  anamnesis: string;
  petCf: number;
  petRf: number;
  petPulse: number;
  petTemperature: number;
  petConsultationWeight: number;
  petAttitude: string;
  petCorporalCondition: string;
  petHidratationState: string;
  clinicalConsultationTreatment: {
    productName: string;
    posology: string;
    totalDose: number;
  }[];
}
