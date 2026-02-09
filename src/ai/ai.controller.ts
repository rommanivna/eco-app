import { Controller, Get } from '@nestjs/common';
import { AiService } from './ai.service';
import { ProductsService } from 'src/products/products.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService, private readonly productsService: ProductsService) {}

  @Get('recipe') // <--- ПЕРЕВІР ЦЕЙ РЯДОК
  async getRecipe() {
    const dbProducts = await this.productsService.findAll();
    const productNames = dbProducts.map(p => p.name);
    return this.aiService.generateRecipe(productNames);
  }
}