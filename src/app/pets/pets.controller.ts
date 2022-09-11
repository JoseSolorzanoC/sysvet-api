import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
