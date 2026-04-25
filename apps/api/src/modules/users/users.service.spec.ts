import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ConflictException } from '@nestjs/common';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as bcrypt from 'bcrypt';

vi.mock('bcrypt', () => ({
  hash: vi.fn().mockResolvedValue('hashed_password'),
}));

describe('UsersService', () => {
  let service: UsersService;
  let prisma: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: vi.fn(),
              findMany: vi.fn(),
              count: vi.fn(),
              create: vi.fn(),
              delete: vi.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw ConflictException if user email already exists', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: '1', email: 'test@test.com' });

    const dto = { email: 'test@test.com', password: 'password123' };

    await expect(service.create(dto)).rejects.toThrow(ConflictException);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: dto.email } });
  });

  it('should hash password and create user successfully', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({ id: '1', email: 'new@test.com' });

    const dto = { email: 'new@test.com', password: 'plain_password' };
    const result = await service.create(dto);

    expect(bcrypt.hash).toHaveBeenCalledWith('plain_password', 10);
    expect(prisma.user.create).toHaveBeenCalled();
    expect(result.email).toBe('new@test.com');
  });

  it('should return a user without password field', async () => {
    const mockUser = { id: '1', email: 'test@test.com', role: 'admin' };
    prisma.user.findUnique.mockResolvedValue(mockUser);

    const result = await service.findById('1');

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
      select: { id: true, email: true, role: true, created: true },
    });
    expect(result).toEqual(mockUser);
  });

  it('should return paginated users and metadata based on search and pagination params', async () => {
    const mockItems = [
      { id: '1', email: 'user1@test.com', role: 'user', created: new Date() },
      { id: '2', email: 'user2@test.com', role: 'admin', created: new Date() },
    ];
    const mockTotal = 50;

    prisma.user.findMany.mockResolvedValue(mockItems);
    prisma.user.count.mockResolvedValue(mockTotal);

    const result = await service.findAll('test-email', 2, 10);

    expect(prisma.user.findMany).toHaveBeenCalledWith({
      where: {
        email: { contains: 'test-email', mode: 'insensitive' },
      },
      select: expect.any(Object),
      take: 10,
      skip: 10, // (page 2 - 1) * 10
      orderBy: { created: 'desc' },
    });

    expect(result.items).toHaveLength(2);
    expect(result.total).toBe(mockTotal);
    expect(result.pages).toBe(5); // 50 total / 10 limit
    expect(result.currentPage).toBe(2);
  });


  it('should call prisma delete with correct id', async () => {
    prisma.user.delete.mockResolvedValue({ id: '1' });

    await service.remove('1');

    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });
});
