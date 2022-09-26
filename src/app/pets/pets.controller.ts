import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FileInterceptor('file'))
  savePet(
    @GetUser() user: User,
    @Body() data: PetDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Pet> {
    return this.petsService.savePet(user, data, file);
  }

  @Auth()
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('file'))
  updatePet(
    @Param('id') petId: string,
    @Body() pet: PetDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Pet> {
    return this.petsService.updatePet(petId, pet, file);
  }

  @Auth()
  @Delete('delete/:id')
  deletePet(@Param('id') petId: string): Promise<Pet> {
    return this.petsService.deletePet(petId);
  }
}
