import { Controller, Post, Body, HttpCode, HttpStatus, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { LoginDto, AuthResponse } from '@enterprise/api-contracts';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Version('1')
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
