import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UsePipes,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Role } from '../enums';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import { AuthService } from './auth.service';
import { Auth } from './decorator';
import { SignInDto, SignUpDto } from './dto';
import { loginSchema, signUpSchema } from './schema';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    @UsePipes(new JoiValidationPipe(loginSchema))
    signIn(@Body() authDto: SignInDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signup')
    @UsePipes(new JoiValidationPipe(signUpSchema))
    signUp(@Body() signUpDto: SignUpDto): Promise<User> {
        signUpDto.role = Role.user;
        return this.authService.signUp(signUpDto);
    }

    @HttpCode(HttpStatus.OK)
    @Auth(Role.admin)
    @Post('signup/doctor')
    @UsePipes(new JoiValidationPipe(signUpSchema))
    signUpDoctor(@Body() signUpDto: SignUpDto): Promise<User> {
        signUpDto.role = Role.doctor;
        return this.authService.signUp(signUpDto);
    }
}
