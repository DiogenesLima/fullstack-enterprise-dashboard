import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, MinLength } from 'class-validator';
import type { CreateUserDto as ICreateUserDto } from '@enterprise/api-contracts';

export class CreateUserDto implements ICreateUserDto {
  @ApiProperty({ example: 'admin@enterprise.uk' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({ minLength: 8, example: 'admin123' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @ApiProperty({ enum: ['admin', 'user'], default: 'user' })
  @IsOptional()
  @IsEnum(['admin', 'user'], { message: 'Role must be admin or user' })
  role?: 'admin' | 'user';
}
