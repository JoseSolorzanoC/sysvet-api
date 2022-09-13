import { Module } from '@nestjs/common';
import { ClinicalConsultationController } from './clinical-consultation.controller';
import { ClinicalConsultationService } from './clinical-consultation.service';

@Module({
  controllers: [ClinicalConsultationController],
  providers: [ClinicalConsultationService],
})
export class ClinicalConsultationModule {}
