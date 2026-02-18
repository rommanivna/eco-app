import { forwardRef, Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaModule } from '../prisma/prisma.module'; 
import { AuthModule } from 'src/auth/auth.module';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule), AiModule], // Додано AiModule
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService], // Експортуємо, щоб інші модулі могли користуватися
})
export class ProductsModule {}