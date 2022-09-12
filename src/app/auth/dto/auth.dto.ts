import { Prisma } from '@prisma/client';
import { Role } from '../../enums';

export interface SignInDto {
  email: string;
  password: string;
}

export interface SignUpDto {
  documentType: number;
  documentNumber: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role?: Role;
}

export type UserNoPassword = Prisma.UserGetPayload<{
  select: {
    passwordHash: false;
  };
}>;
