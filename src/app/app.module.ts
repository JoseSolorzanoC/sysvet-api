import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppointmentModule } from './appointment/appointment.module';
import { AuthModule } from './auth/auth.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { PetsModule } from './pets/pets.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ClinicalConsultationModule } from './clinical-consultation/clinical-consultation.module';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    MaintenanceModule,
    PetsModule,
    AppointmentModule,
    ClinicalConsultationModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
