import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    // 1. Перевіряємо, чи такий email вже існує
    const userExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (userExists) {
      throw new BadRequestException('User with this email already exists! 🚫');
    }

    // 2. Створюємо користувача
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password, // Тимчасово без хешування (безпека буде далі!)
        name: dto.name,
      },
    });
  }
}