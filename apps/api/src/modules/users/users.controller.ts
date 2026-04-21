import { Controller, Get, Version } from '@nestjs/common';
import type { UserResponse } from '@enterprise/api-contracts';

@Controller('users')
export class UsersController {

  @Version('1')
  @Get('profile')
  getProfile(): UserResponse {
    return {
      id: '123',
      email: 'senior.dev@uk-market.co.uk',
      role: 'admin',
      created: new Date().toISOString(),
    };
  }
}
