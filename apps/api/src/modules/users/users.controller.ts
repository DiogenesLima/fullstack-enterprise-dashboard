import { Controller, Get, Post, Delete, Body, Param, Version, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { UserResponse } from '@enterprise/api-contracts';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return { success: true, message: 'User created', id: user.id };
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<UserResponse[]> {
    const users = await this.usersService.findAll();
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      role: user.role as 'admin' | 'user',
      created: user.created.toISOString(),
    }));
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return { success: true, message: 'User deleted' };
  }
}
