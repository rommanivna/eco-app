import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ProductsModule } from 'src/products/products.module';
import { RecipesModule } from 'src/recipes/recipes.module';
import { AuthModule } from 'src/auth/auth.module';
import { forwardRef } from '@nestjs/common';
@Module({
  providers: [AiService],
  controllers: [AiController],
  imports: [forwardRef(() => ProductsModule), RecipesModule, forwardRef(() => AuthModule)], // Імпортуємо ProductsModule, щоб отримати доступ до ProductsService
  exports: [AiService], // Експортуємо AiService, якщо інші модулі захочуть його використовувати
})  
export class AiModule {}