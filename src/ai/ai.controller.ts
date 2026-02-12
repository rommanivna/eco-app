import { Controller, Get } from '@nestjs/common';
import { AiService } from './ai.service';
import { ProductsService } from 'src/products/products.service';
import { RecipesService } from 'src/recipes/recipes.service';

@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService, 
    private readonly productsService: ProductsService, 
    private readonly recipesService: RecipesService
  ) {}

@Get('recipe')
  async getRecipe() {
    const dbProducts = await this.productsService.findAll();
    const productNames = dbProducts.map(p => p.name);
    
    const aiGeneratedRecipe = await this.aiService.generateRecipe(productNames);

    // Додай цей console.log, щоб побачити об'єкт перед збереженням
    console.log("Parsed Recipe Object:", aiGeneratedRecipe);

    return await this.recipesService.create({
        title: aiGeneratedRecipe.title || "Untitled Recipe", // Захист від пустих значень
        description: aiGeneratedRecipe.description || "",
        ingredients: aiGeneratedRecipe.ingredients || [],
        instructions: Array.isArray(aiGeneratedRecipe.instructions) 
            ? aiGeneratedRecipe.instructions.join('\n') 
            : (aiGeneratedRecipe.instructions || ""),
    });
  }
}