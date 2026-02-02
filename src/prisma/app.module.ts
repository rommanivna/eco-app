import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { PrismaService } from './prisma.service'; // Переконайтеся, що цей файл створено

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService], // Видаліть AppService звідси
})
export class AppModule {}