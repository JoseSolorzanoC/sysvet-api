import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto, SignUpDto, UserNoPassword } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(dto: SignUpDto): Promise<User> {
    //Generate the password hash
    const hash = await argon.hash(dto.password);
    //Save the user in the db
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          passwordHash: hash,
          status: true,
          role: dto.role,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          person: {
            create: {
              documentTypeId: dto.documentType,
              documentNumber: dto.documentNumber,
              fullName: dto.fullName,
              cellphone: dto.phoneNumber,
            },
          },
        },
      });

      delete user.passwordHash;
      //Return the saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2003':
            if (
              error.meta.field_name === 'Person_documentTypeId_fkey (index)'
            ) {
              throw new ForbiddenException(
                'The Document Type does not exist in database',
              );
            }
            break;
          case 'P2002':
            if (error.code === 'P2002') {
              throw new ForbiddenException('Credentials taken');
            }
            break;
        }
      }
      throw error;
    }
  }

  async signIn(dto: SignInDto): Promise<{ accessToken: string }> {
    //Find the user by email
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //If user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('Incorrect Credentials');
    }
    //compare password
    const pwMatches = await argon.verify(user.passwordHash, dto.password);
    //If password is incorrect throw exception
    if (!pwMatches) {
      throw new ForbiddenException('Incorrect Credentials');
    }

    //Send back token
    return {
      accessToken: await this.signToken(user.id, user.email, user.role),
    };
  }

  async updateUser(dto: SignUpDto): Promise<User> {
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

    //Update the user in the db
    try {
      const user = await this.prismaService.user.update({
        where: {
          email: dto.email,
        },
        data: {
          email: dto.email,
          passwordHash: hash,
          status: true,
          role: dto.role,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          person: {
            update: {
              documentTypeId: dto.documentType,
              documentNumber: dto.documentNumber,
              fullName: dto.fullName,
              cellphone: dto.phoneNumber,
            },
          },
        },
      });

      delete user.passwordHash;
      //Return the saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2003':
            if (
              error.meta.field_name === 'Person_documentTypeId_fkey (index)'
            ) {
              throw new ForbiddenException(
                'The Document Type does not exist in database',
              );
            }
            break;
          case 'P2002':
            if (error.code === 'P2002') {
              throw new ForbiddenException('Credentials taken');
            }
            break;
        }
      }
      throw error;
    }
  }

  deleteUser(userId: string): Promise<UserNoPassword> {
    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        status: false,
      },
      select: {
        id: true,
      },
    });
  }

  signToken(
    userId: string,
    userEmail: string,
    userRole: string,
  ): Promise<string> {
    const payload = {
      sub: userId,
      email: userEmail,
      role: userRole,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: '8h',
      secret: this.configService.get('JWT_SECRET_KEY'),
    });
  }
}
