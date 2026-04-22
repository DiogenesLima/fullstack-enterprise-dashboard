import { Controller, Get, Post, Body, Version } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { UserResponse } from '@enterprise/api-contracts';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Version('1')
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return { success: true, message: 'User created', id: user.id };
  }

  @Version('1')
  @Get()
  async findAll(): Promise<UserResponse[]> {
    const users = await this.usersService.findAll();
    return users.map((u) => ({
      ...u,
      role: u.role as 'admin' | 'user',
      created: u.created.toISOString(),
    }));
  }
}
