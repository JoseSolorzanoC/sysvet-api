import { ForbiddenException, Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  getDoctors(): Promise<User[]> {
    return this.prismaService.user.findMany({
      where: {
        role: Role.DOCTOR,
        status: true,
      },
      include: {
        person: true,
      },
    });
  }

  async updateProfile(currentUser: User, dto: UpdateProfileDto): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException('Usuario no encontrado');
    }

    let hash = user.passwordHash;

    if (dto.password) {
      //Generate the password hash
      hash = await argon.hash(dto.password);
    }

    return this.prismaService.user.update({
      data: {
        email: dto.email,
        passwordHash: hash,
        person: {
          update: dto.person,
        },
      },
      where: {
        id: currentUser.id,
      },
    });
  }
}
