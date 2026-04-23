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
}
