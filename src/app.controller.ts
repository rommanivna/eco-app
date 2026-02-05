import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './app.service';

@Controller('products')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getProducts() {
    return this.prismaService.product.findMany();
  }
}