import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsService } from './analytics.service';
import { PrismaService } from '../../prisma/prisma.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  const mockPrisma = {
    user: {
      count: vi.fn(),
      findFirst: vi.fn()
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyticsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<AnalyticsService>(AnalyticsService);
  });

  it('should return overview metrics', async () => {
    mockPrisma.user.count
      .mockResolvedValueOnce(100) // totalUsers
      .mockResolvedValueOnce(10);  // totalAdmins
    mockPrisma.user.findFirst.mockResolvedValue({ email: 'last@user.com' });

    const result = await service.getOverview();

    expect(result.totalUsers).toBe(100);
    expect(result.totalAdmins).toBe(10);
    expect(result.lastSignup).toBe('last@user.com');
  });

  it('should return the 5 most recent users', async () => {
    const mockUsers = [
      { id: '1', email: 'user1@test.com', role: 'user', created: new Date() },
      { id: '2', email: 'user2@test.com', role: 'admin', created: new Date() },
    ];

    mockPrisma.user.findMany = vi.fn().mockResolvedValue(mockUsers);

    const result = await service.getRecentUsers(5);

    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty('email');
    expect(result[0]).not.toHaveProperty('password');
    
    expect(mockPrisma.user.findMany).toHaveBeenCalledWith({
      take: 5,
      orderBy: { created: 'desc' },
      select: {
        id: true,
        email: true,
        role: true,
        created: true,
      },
    });
  });
});
