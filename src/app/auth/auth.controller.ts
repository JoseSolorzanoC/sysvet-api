import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Role } from '../enums';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import { AuthService } from './auth.service';
import { Auth } from './decorator';
import { SignInDto, SignUpDto, UserNoPassword } from './dto';
import { loginSchema, signUpSchema, updateUserSchema } from './schema';

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

  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Put('update/doctor')
  @UsePipes(new JoiValidationPipe(updateUserSchema))
  updateDoctor(@Body() signUpDto: SignUpDto): Promise<User> {
    signUpDto.role = Role.doctor;
    return this.authService.updateUser(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Delete('delete/doctor/:id')
  deleteDoctor(@Param('id') userId: string): Promise<UserNoPassword> {
    return this.authService.deleteUser(userId);
  }
}
