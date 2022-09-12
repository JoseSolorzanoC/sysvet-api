import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Appointment, User } from '@prisma/client';
import { Auth, GetUser } from '../auth/decorator';
import { AppointmentService } from './appointment.service';
import { AppointmentDto } from './dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Auth()
  @Get('all')
  getAllAppointmentsByUser(@GetUser() user: User): Promise<Appointment[]> {
    return this.appointmentService.getAllAppointments(user);
  }

  @Auth()
  @Post('new')
  saveAppointment(
    @GetUser() user: User,
    @Body() appointment: AppointmentDto,
  ): Promise<Appointment> {
    return this.appointmentService.saveAppointment(user, appointment);
  }

  @Auth()
  @Delete('cancel/:id')
  cancelAppointment(@Param('id') appointmentId: string): Promise<Appointment> {
    return this.appointmentService.cancelAppointment(appointmentId);
  }
}
