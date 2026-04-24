import * as bcrypt from 'bcrypt';
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '@enterprise/api-contracts';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (exists) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  async findAll(search?: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        where: search
          ? { email: { contains: search, mode: 'insensitive' } }
          : {},
        select: { id: true, email: true, role: true, created: true },
        take: limit,
        skip: skip,
        orderBy: { created: 'desc' },
      }),
      this.prisma.user.count({
        where: search
          ? { email: { contains: search, mode: 'insensitive' } }
          : {},
      }),
    ]);

    const users = items.map((user) => ({
      id: user.id,
      email: user.email,
      role: user.role as 'admin' | 'user',
      created: user.created.toISOString(),
    }));

    return { items: users, total, pages: Math.ceil(total / limit), currentPage: page };
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, role: true, created: true }
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
