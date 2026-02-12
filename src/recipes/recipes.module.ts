import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { PrismaModule } from '../prisma/prisma.module'; // Імпортуємо PrismaModule для доступу до PrismaService
import { RecipesController } from './recipes.controller';
@Module({
  imports: [PrismaModule],
  providers: [RecipesService],
  exports: [RecipesService],
  controllers: [RecipesController],
})
export class RecipesModule {}
