import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
    const token = this.authService.login(body);

    res.cookie('token', token, {
      httpOnly: true, // Безпечніше, щоб JS не мав доступу
      secure: false, // true для HTTPS
      sameSite: 'lax', // або 'strict'
      maxAge: 1000 * 60 * 60 * 24, // 1 день
    });

    return { message: 'Login successful' };
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
