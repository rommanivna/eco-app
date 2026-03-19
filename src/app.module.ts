import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { AiModule } from './ai/ai.module';
import { RecipesModule } from './recipes/recipes.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [PrismaModule, ProductsModule, AiModule, RecipesModule, AuthModule, ConfigModule.forRoot({ isGlobal: true })], // Тільки імпортуємо готові модулі
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}