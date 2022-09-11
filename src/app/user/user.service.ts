import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    getDoctors(): Promise<User[]> {
        return this.prismaService.user.findMany({
            where: {
                role: Role.DOCTOR,
            },
            include: {
                person: true,
            },
        });
    }
}
