import { Controller, Get, Post, Delete, Body, Param, Version, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { UserResponse } from '@enterprise/api-contracts';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 409, description: 'User already exists.' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return { success: true, message: 'User created', id: user.id };
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully.' })
  @Get()
  async findAll(@Query('search') search?: string): Promise<UserResponse[]> {
    const users = await this.usersService.findAll(search);
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      role: user.role as 'admin' | 'user',
      created: user.created.toISOString(),
    }));
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remove a user' })
  @ApiParam({ name: 'id', description: 'The UUID of the user' })
  @ApiResponse({ status: 200, description: 'User removed successfully.' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return { success: true, message: 'User deleted' };
  }
}
