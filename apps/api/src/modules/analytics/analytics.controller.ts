import { Controller, Get, UseGuards, Version } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';

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
}
