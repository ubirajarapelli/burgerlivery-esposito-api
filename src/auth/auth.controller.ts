import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/authLogin.dto';
import { AuthRegisterDto } from './dto/authRegister.dto';
import { CreateBackofficeUserDto } from './dto/createBackofficeUser.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

class GoogleAuthGuard extends AuthGuard('google') {}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login comum (backoffice/cliente)
  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: AuthLoginDto) {
    return this.authService.login(dto);
  }

  // Registro cliente
  @Post('register')
  async register(@Body() dto: AuthRegisterDto) {
    return this.authService.register(dto);
  }

  // Registro backoffice (deve ser protegido com guard de admin em produção)
  @Post('backoffice')
  async createBackoffice(@Body() dto: CreateBackofficeUserDto) {
    return this.authService.createBackofficeUser(dto);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: Request) {
    // req.user populado pela GoogleStrategy.validate
    return this.authService.loginWithGoogle(req.user as any);
  }
}
