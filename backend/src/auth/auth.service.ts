import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export interface JwtPayload {
  id: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // We get all comming data from the dto
    const { email, password } = dto;

    // We check if the user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    // If the user exists, we throw a conflict exception
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // If the user does not exist, we create a new user
    const hashedPassword = await bcrypt.hash(password, 10);

    // We create a new user in the database
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = this.jwtService.sign({
      id: newUser.id,
    });

    return { user: { ...newUser, password: undefined }, token };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Password is incorrect');

    const token = this.jwtService.sign({ id: user.id });

    return {
      token,
      user: { ...user, password: undefined },
    };
  }

  logout() {
    return { message: 'Logged out successfully' };
  }
}
