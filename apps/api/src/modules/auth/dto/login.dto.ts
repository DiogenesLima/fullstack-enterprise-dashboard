import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';
import type { LoginDto as ILoginDto } from '@enterprise/api-contracts';

export class LoginDto implements ILoginDto {
  @ApiProperty({ example: 'admin@enterprise.uk' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({ minLength: 8, example: 'admin123' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
