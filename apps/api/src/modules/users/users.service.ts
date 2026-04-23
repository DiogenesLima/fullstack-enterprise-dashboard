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

  async findAll(search?: string) {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    return this.prisma.user.findMany({
      where: search ? {
            email: {
              contains: search,
              mode: 'insensitive',
            },
      } : {},
      select: {
        id: true,
        email: true,
        role: true,
        created: true,
      },
      orderBy: { created: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findFirst({ where: { id } });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
