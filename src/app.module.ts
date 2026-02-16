import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { AiModule } from './ai/ai.module';
import { RecipesModule } from './recipes/recipes.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [PrismaModule, ProductsModule, AiModule, RecipesModule, AuthModule], // Тільки імпортуємо готові модулі
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}