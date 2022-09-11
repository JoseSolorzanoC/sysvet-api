import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { DocumentType, PetRace, PetSpecie, User } from '@prisma/client';
import { Auth, GetUser } from '../auth/decorator';
import { Navigation } from './dto';
import { MaintenanceService } from './maintenance.service';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private maintenanceService: MaintenanceService) {}

  @Get('document-types')
  @HttpCode(HttpStatus.OK)
  getAllDocumentTypes(): Promise<DocumentType[]> {
    return this.maintenanceService.getAllDocumentTypes();
  }

  @Get('pet-races')
  @HttpCode(HttpStatus.OK)
  getAllRaces(): Promise<PetRace[]> {
    return this.maintenanceService.getAllRaces();
  }

  @Get('pet-species')
  @HttpCode(HttpStatus.OK)
  getAllSpecies(): Promise<PetSpecie[]> {
    return this.maintenanceService.getAllSpecies();
  }

  @Auth()
  @Get('navigation')
  @HttpCode(HttpStatus.OK)
  getRoleMenu(@GetUser() user: User): Navigation {
    return this.maintenanceService.getRoleMenu(user);
  }
}
