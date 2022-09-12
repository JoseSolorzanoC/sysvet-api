import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Pet, User } from '@prisma/client';
import { Auth, GetUser } from '../auth/decorator';
import { PetDto } from './dto';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(private petsService: PetsService) {}

  @Auth()
  @Get('all')
  getAllPetsByUser(@GetUser() user: User): Promise<Pet[]> {
    return this.petsService.getAllPetsByUser(user);
  }

  @Auth()
  @Post('new')
  savePet(@GetUser() user: User, @Body() pet: PetDto): Promise<Pet> {
    return this.petsService.savePet(user, pet);
  }

  @Auth()
  @Put('update/:id')
  updatePet(@Param('id') petId: string, @Body() pet: PetDto): Promise<Pet> {
    return this.petsService.updatePet(petId, pet);
  }

  @Auth()
  @Delete('delete/:id')
  deletePet(@Param('id') petId: string): Promise<Pet> {
    return this.petsService.deletePet(petId);
  }
}
