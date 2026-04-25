import { Controller, Post, Body, HttpCode, HttpStatus, Version } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { AuthResponse } from '@enterprise/api-contracts';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Version('1')
  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiOperation({ summary: 'Authenticate user and return the JWT token' })
  @ApiResponse({ status: 200, description: 'User authenticated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 401, description: 'Invalid email or password.' })
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
