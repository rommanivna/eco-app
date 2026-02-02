import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Product } from '@prisma/client';


@Controller('products') // Змінимо шлях на /products
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }
}