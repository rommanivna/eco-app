import { Controller, Get, Param, Delete } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes') // Всі запити будуть починатися з /recipes
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  // 1. Отримати ВІСІМКА рецептів
  @Get()
  async getAllRecipes() {
    return this.recipesService.findAll();
  }

  // 2. Отримати ОДИН конкретний рецепт за ID
  @Get(':id')
  async getOneRecipe(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @Delete(':id')
  async removeRecipe(@Param('id') id: string) {
    return this.recipesService.remove(id); // Цей метод ми зараз додамо в сервіс
  }
}