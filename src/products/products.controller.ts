import { Controller, Get, Post, Body, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from '@nestjs/passport'; // Спростила шлях імпорту

@UseGuards(AuthGuard('jwt')) // 🛡️ Тепер УСІ маршрути (Get, Post, Delete) захищені
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Req() req) {
    // req.user береться з JWT токена
    return this.productsService.findAll(req.user.id); 
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Req() req) {
    // 💡 ВАЖЛИВО: Передаємо дані продукту РАЗОМ з ID користувача
    return this.productsService.create({ 
      ...createProductDto, 
      userId: req.user.id 
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // Тут в майбутньому можна додати перевірку, чи видаляє юзер саме СВІЙ продукт
    return this.productsService.remove(id);
  }
}