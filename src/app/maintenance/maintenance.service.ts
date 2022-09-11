import { Injectable } from '@nestjs/common';
import { DocumentType, PetRace, PetSpecie, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  ADMIN_OPTIONS,
  DOCTOR_OPTIONS,
  Navigation,
  navigationData,
  USER_OPTIONS,
} from './dto';

@Injectable()
export class MaintenanceService {
  constructor(private prismaService: PrismaService) {}

  getAllDocumentTypes(): Promise<DocumentType[]> {
    return this.prismaService.documentType.findMany();
  }

  getAllRaces(): Promise<PetRace[]> {
    return this.prismaService.petRace.findMany();
  }

  getAllSpecies(): Promise<PetSpecie[]> {
    return this.prismaService.petSpecie.findMany();
  }

  getRoleMenu(user: User): Navigation {
    const navigation: Navigation = {
      compact: [],
      default: [],
      futuristic: [],
      horizontal: navigationData,
    };
    switch (user.role) {
      case 'USER':
        navigation.horizontal = navigation.horizontal.filter((item) =>
          USER_OPTIONS.includes(item.id),
        );
        break;
      case 'DOCTOR':
        navigation.horizontal = navigation.horizontal.filter((item) =>
          DOCTOR_OPTIONS.includes(item.id),
        );
        break;
      case 'ADMIN':
        navigation.horizontal = navigation.horizontal.filter((item) =>
          ADMIN_OPTIONS.includes(item.id),
        );
        break;
    }

    return navigation;
  }
}
