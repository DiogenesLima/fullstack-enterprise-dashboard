import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async login(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user && (await bcrypt.compare(pass, user.password))) {
      const payload = { sub: user.id, email: user.email, role: user.role };
      return {
        access_token: await this.jwtService.signAsync(payload),
        user: { email: user.email, role: user.role },
      };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
