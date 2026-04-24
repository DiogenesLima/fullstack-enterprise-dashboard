import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) { }

  async getOverview() {
    const [totalUsers, totalAdmins, lastUser] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { role: 'admin' } }),
      this.prisma.user.findFirst({ orderBy: { created: 'desc' } }),
    ]);

    return {
      totalUsers,
      totalAdmins,
      lastSignup: lastUser?.email || 'No users yet',
      systemStatus: 'healthy',
    };
  }

  async getRecentUsers(limit = 5) {
    const users = await this.prisma.user.findMany({
      take: limit,
      orderBy: { created: 'desc' },
      select: {
        id: true,
        email: true,
        role: true,
        created: true
      }
    });

    return users.map((user) => ({
      id: user.id,
      email: user.email,
      role: user.role as 'admin' | 'user',
      created: user.created.toISOString(),
    }));
  }
}
