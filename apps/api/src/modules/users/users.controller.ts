import { Controller, Get, Version, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { UserResponse } from '@enterprise/api-contracts';

@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) { }

  @Version('1')
  @Get('profile')
  async getProfile(): Promise<UserResponse> {
    const user = await this.prisma.user.findFirst();

    if (!user) {
      throw new NotFoundException('No user found in database. Did you seed it?');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role as 'admin' | 'user',
      created: user.created.toISOString(),
    };
  }
}
