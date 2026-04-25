import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as bcrypt from 'bcrypt';

vi.mock('bcrypt', () => ({
  compare: vi.fn(),
  hash: vi.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;

  const mockPrisma = {
    user: { findUnique: vi.fn() }
  };

  const mockJwt = { signAsync: vi.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwt },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should throw Unauthorized if password does not match', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ email: 'test@test.com', password: 'hashed_password' });
    vi.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

    await expect(service.login('test@test.com', 'wrong_pass')).rejects.toThrow(UnauthorizedException);
  });

  it('should return access_token on valid login', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ id: '1', email: 'test@test.com', password: 'hash', role: 'admin' });
    vi.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
    mockJwt.signAsync.mockResolvedValue('fake_token');

    const result = await service.login('test@test.com', 'pass');
    expect(result).toHaveProperty('access_token');
    expect(result.access_token).toBe('fake_token');
  });
});
