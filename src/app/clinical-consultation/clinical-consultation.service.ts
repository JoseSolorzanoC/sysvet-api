/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ClinicalConsultation } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ClinicalConsultationDto } from './dto';

@Injectable()
export class ClinicalConsultationService {
  constructor(private prismaService: PrismaService) {}

  saveClinicalConsultation(
    dto: ClinicalConsultationDto,
  ): Promise<ClinicalConsultation> {
    return this.prismaService.clinicalConsultation.create({
      data: {
        petId: dto.petId,
        reason: dto.reason,
        openedDate: new Date(dto.openedDate),
        anamnesis: dto.anamnesis,
        petCf: dto.petCf,
        petRf: dto.petRf,
        petPulse: dto.petPulse,
        petTemperature: dto.petTemperature,
        petConsultationWeight: dto.petConsultationWeight,
        petAttitude: dto.petAttitude,
        petCorporalCondition: dto.petCorporalCondition,
        petHidratationState: dto.petHidratationState,
        clinicalConsultationTreatment: {
          create: dto.clinicalConsultationTreatment,
        },
      },
    });
  }

  getAllActiveConsultations(): Promise<ClinicalConsultation[]> {
    return this.prismaService.clinicalConsultation.findMany({
      where: {
        status: true,
      },
      include: {
        pet: true,
        clinicalConsultationTreatment: true,
      },
    });
  }

  getConsultationById(
    clinicalConsultationId: string,
  ): Promise<ClinicalConsultation> {
    return this.prismaService.clinicalConsultation.findUnique({
      where: {
        id: clinicalConsultationId,
      },
      include: {
        clinicalConsultationTreatment: true,
        pet: true,
      },
    });
  }
}
