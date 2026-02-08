import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  async create(@Body() body: { name: string; expiryDate: string; category?: string }) {
    return (this.productsService as any).create({
      ...body,
      expiryDate: new Date(body.expiryDate),
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}