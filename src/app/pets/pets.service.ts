import { Injectable } from '@nestjs/common';
import { Pet, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PetDto } from './dto';

@Injectable()
export class PetsService {
  constructor(private prismaService: PrismaService) {}

  getAllPetsByUser(user: User): Promise<Pet[]> {
    if (user.role === 'USER') {
      return this.prismaService.pet.findMany({
        where: {
          tutorId: user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: { petRace: true, petSpecie: true },
      });
    }
    return this.prismaService.pet.findMany({
      include: { petRace: true, petSpecie: true },
    });
  }

  savePet(user: User, pet: PetDto): Promise<Pet> {
    return this.prismaService.pet.create({
      data: {
        birthDate: new Date(pet.birthDate),
        furColor: pet.furColor,
        name: pet.name,
        lastWeight: pet.lastWeight,
        raceId: pet.raceId,
        specieId: pet.specieId,
        photoUrl: pet.photoUrl,
        tutorId: user.id,
      },
    });
  }

  updatePet(petId: string, pet: PetDto): Promise<Pet> {
    pet.birthDate = new Date(pet.birthDate);
    return this.prismaService.pet.update({
      where: {
        id: petId,
      },
      data: pet,
    });
  }

  deletePet(petId: string): Promise<Pet> {
    return this.prismaService.pet.delete({
      where: {
        id: petId,
      },
    });
  }
}
