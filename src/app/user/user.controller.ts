import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { Auth, GetUser } from '../auth/decorator';
import { Role } from '../enums';
import { UserService } from './user.service';
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Auth()
    @Get('me')
    getMe(@GetUser() user: User): any {
        return user;
    }

    @Auth(Role.admin)
    @Get('doctors')
    getDoctors(): any {
        return this.userService.getDoctors();
    }
}
