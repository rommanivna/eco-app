import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Цей декоратор зробить PrismaService доступним всюди без повторного імпорту! 🌍
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Обов'язково експортуємо, щоб інші могли користуватися
})
export class PrismaModule {}