import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '../../enums';
import { JwtGuard, RolesGuard } from '../guard';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Auth = (...roles: Role[]): any =>
    applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(JwtGuard, RolesGuard)
    );
