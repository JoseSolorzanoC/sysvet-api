/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ClinicalConsultation } from '@prisma/client';
import { Auth } from '../auth/decorator';
import { Role } from '../enums';
import { ClinicalConsultationService } from './clinical-consultation.service';
import { ClinicalConsultationDto } from './dto';

@Controller('clinical-consultation')
export class ClinicalConsultationController {
  constructor(
    private clinicalConsultationService: ClinicalConsultationService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Auth(Role.doctor)
  @Post('create')
  saveClinicalConsultation(
    @Body() dto: ClinicalConsultationDto,
  ): Promise<ClinicalConsultation> {
    return this.clinicalConsultationService.saveClinicalConsultation(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.doctor)
  @Get('all')
  getAllActiveConsultations(): Promise<ClinicalConsultation[]> {
    return this.clinicalConsultationService.getAllActiveConsultations();
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.doctor)
  @Get(':id')
  getConsultationById(
    @Param('id') clinicalConsultationId: string,
  ): Promise<ClinicalConsultation> {
    return this.clinicalConsultationService.getConsultationById(
      clinicalConsultationId,
    );
  }
}
