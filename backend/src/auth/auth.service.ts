import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { HashService } from 'src/hash/hash.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  id: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (userExists) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await this.hashService.hashPassword(dto.password);
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
      },
    });

    return {
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    };
  }

  async login(dto: LoginDto) {
    const userExist = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!userExist) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hashService.comparePassword(
      dto.password,
      userExist.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = {
      id: userExist.id,
      email: userExist.email,
    };
    const token = this.jwtService.sign(payload);
    return {
      token,
      user: { id: userExist.id, email: userExist.email },
    };
  }
}
