import { Controller, Get, UseGuards, Version } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import type { UserResponse } from '@enterprise/api-contracts';

@ApiTags('Analytics')
@ApiBearerAuth()
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) { }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get analytics overview' })
  @ApiResponse({ status: 200, description: 'Overview retrieved successfully.' })
  @Get('overview')
  async getOverview() {
    return this.analyticsService.getOverview();
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get recent users' })
  @ApiResponse({ status: 200, description: 'Recent users retrieved successfully.' })
  @Get('recent-users')
  async getRecentUsers(): Promise<UserResponse[]> {
    return this.analyticsService.getRecentUsers();
  }
}
