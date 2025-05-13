import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UserResolver],
})
export class UsersModule {}
