import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { AiModule } from './ai/ai.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [PrismaModule, ProductsModule, AiModule, RecipesModule], // Тільки імпортуємо готові модулі
  controllers: [],
  providers: [],
})
export class AppModule {}