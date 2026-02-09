import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaModule } from '../prisma/prisma.module'; // Правильний шлях!

@Module({
  imports: [PrismaModule], 
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService], // Експортуємо, щоб інші модулі могли користуватися
})
export class ProductsModule {}