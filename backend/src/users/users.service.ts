import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<{ id: string; email: string; createdAt: Date }[]> {
    return await this.prisma.user.findMany().then((users) => {
      return users.map((user) => ({
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      }));
    });
  }
}
