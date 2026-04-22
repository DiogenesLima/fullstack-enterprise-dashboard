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

    return this.prisma.user.create({ data: createUserDto });
  }

  async findAll() {
    return this.prisma.user.findMany({ orderBy: { created: 'desc' } });
  }

  async findOne(id: string) {
    return this.prisma.user.findFirst({ where: { id: id } });
  }
}
