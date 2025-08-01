import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginDto } from '../auth/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.loginAfterValidation(dto);
  }
}
