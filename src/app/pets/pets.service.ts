import { Injectable } from '@nestjs/common';
import { Pet, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PetDto } from './dto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

@Injectable()
export class PetsService {
  client: SupabaseClient;
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {
    this.client = createClient(
      'https://hhmswdiyjtahefatmxno.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhobXN3ZGl5anRhaGVmYXRteG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjI0Mjg1MzYsImV4cCI6MTk3ODAwNDUzNn0.4JgI9QM8a_d4cpBhaG6A5f0zrQ7OCS_xGI2cK2In86Q',
      {
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    );
  }

  getAllPetsByUser(user: User): Promise<Pet[]> {
    if (user.role === 'USER') {
      return this.prismaService.pet.findMany({
        where: {
          tutorId: user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          petRace: true,
          petSpecie: true,
        },
      });
    }
    return this.prismaService.pet.findMany({
      include: { petRace: true, petSpecie: true },
    });
  }

  getPetById(petId: string): Promise<Pet> {
    return this.prismaService.pet.findUnique({
      where: {
        id: petId,
      },
      include: {
        tutor: {
          include: {
            person: true,
          },
        },
        petRace: true,
        petSpecie: true,
        clinicalConsultations: true,
      },
    });
  }

  async savePet(
    user: User,
    pet: PetDto,
    petPhoto: Express.Multer.File,
  ): Promise<Pet> {
    let imageUpload: any;
    if (petPhoto) {
      imageUpload = await this.client.storage
        .from('pets-images-bucket')
        .upload(
          `pets/${pet.name}${randomUUID().toString()}.png`,
          petPhoto.buffer,
        );
    }

    let petImageUrl = '';

    if (imageUpload && imageUpload.data) {
      petImageUrl =
        'https://hhmswdiyjtahefatmxno.supabase.co/storage/v1/object/public/' +
        imageUpload.data.Key;
    }

    return this.prismaService.pet.create({
      data: {
        birthDate: new Date(pet.birthDate),
        furColor: pet.furColor,
        name: pet.name,
        lastWeight: Number.parseFloat(pet.lastWeight.toString()),
        raceId: Number.parseInt(pet.raceId.toString()),
        specieId: Number.parseInt(pet.specieId.toString()),
        photoUrl: petImageUrl,
        tutorId: user.id,
      },
    });
  }

  async updatePet(
    petId: string,
    pet: PetDto,
    petPhoto: Express.Multer.File,
  ): Promise<Pet> {
    let imageUpload: any;

    if (petPhoto) {
      imageUpload = await this.client.storage
        .from('pets-images-bucket')
        .upload(
          `pets/${pet.name}${randomUUID().toString()}.png`,
          petPhoto.buffer,
        );
    }

    let petImageUrl = '';

    if (imageUpload && imageUpload.data) {
      petImageUrl =
        'https://hhmswdiyjtahefatmxno.supabase.co/storage/v1/object/public/' +
        imageUpload.data.Key;
    } else {
      petImageUrl = pet.photoUrl;
    }

    pet.birthDate = new Date(pet.birthDate);
    pet.photoUrl = petImageUrl;

    return this.prismaService.pet.update({
      where: {
        id: petId,
      },
      data: {
        birthDate: new Date(pet.birthDate),
        furColor: pet.furColor,
        name: pet.name,
        lastWeight: Number.parseFloat(pet.lastWeight.toString()),
        raceId: Number.parseInt(pet.raceId.toString()),
        specieId: Number.parseInt(pet.specieId.toString()),
        photoUrl: petImageUrl,
      },
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
