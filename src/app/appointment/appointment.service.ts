import { Injectable } from '@nestjs/common';
import { Appointment, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AppointmentDto } from './dto';

@Injectable()
export class AppointmentService {
    constructor(private prismaService: PrismaService) {}

    getAllAppointments(user: User): Promise<Appointment[]> {
        if (user.role === 'USER') {
            return this.prismaService.appointment.findMany({
                where: {
                    tutorId: user.id,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                include: { appointmentPets: true },
            });
        }

        return this.prismaService.appointment.findMany({
            include: { appointmentPets: true },
        });
    }

    saveAppointment(
        user: User,
        appointmentDto: AppointmentDto
    ): Promise<Appointment> {
        return this.prismaService.appointment.create({
            data: {
                tutorId: user.id,
                date: new Date(appointmentDto.date),
                reason: appointmentDto.reason,
                status: true,
                appointmentPets: {
                    // eslint-disable-next-line arrow-parens
                    create: appointmentDto.pets.map((petId) => ({
                        petId: petId,
                    })),
                },
            },
        });
    }
}
