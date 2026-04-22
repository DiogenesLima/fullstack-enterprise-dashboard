import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import type { CreateUserDto as ICreateUserDto } from '@enterprise/api-contracts';

export class CreateUserDto implements ICreateUserDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsOptional()
  @IsEnum(['admin', 'user'], { message: 'Role must be admin or user' })
  role?: 'admin' | 'user';
}
