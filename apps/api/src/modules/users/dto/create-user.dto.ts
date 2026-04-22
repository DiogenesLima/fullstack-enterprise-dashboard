import { IsEmail, IsEnum, IsOptional, MinLength } from 'class-validator';
import type { CreateUserDto as ICreateUserDto } from '@enterprise/api-contracts';

export class CreateUserDto implements ICreateUserDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsOptional()
  @IsEnum(['admin', 'user'], { message: 'Role must be admin or user' })
  role?: 'admin' | 'user';
}
