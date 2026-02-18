import { Controller, Get, Req, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { AiService } from './ai.service';
import { ProductsService } from 'src/products/products.service';
import { RecipesService } from 'src/recipes/recipes.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService, 
    private readonly productsService: ProductsService, 
    private readonly recipesService: RecipesService
  ) {}

  @Get('recipe')
  async getRecipe(@Req() req) {
    const userId = req.user.id;

    // 1. Fetch all products belonging to the user
    const allProducts = await this.productsService.findAll(userId);
    
    // 2. Logic: Focus on products expiring in the next 3 days
    const expiringSoon = allProducts.filter(p => p.daysLeft <= 3 && p.daysLeft >= -1);

    // If no products are expiring, use the oldest 5 products as a fallback
    const productsToProcess = expiringSoon.length > 0 
      ? expiringSoon 
      : allProducts.slice(0, 5);

    if (productsToProcess.length === 0) {
      return { 
        message: "Your fridge is empty! Add some products to get AI recipe suggestions. 🍎" 
      };
    }

    const productNames = productsToProcess.map(p => p.name);
    
    try {
      // 3. Generate recipe using Gemini
      const aiGeneratedRecipe = await this.aiService.generateRecipe(productNames);

      // 4. Save the recipe and link it to the user
      return await this.recipesService.create({
          title: aiGeneratedRecipe.title || "Eco Surprise Meal",
          description: aiGeneratedRecipe.description || "",
          ingredients: aiGeneratedRecipe.ingredients || [],
          instructions: Array.isArray(aiGeneratedRecipe.instructions) 
              ? aiGeneratedRecipe.instructions.join('\n') 
              : (aiGeneratedRecipe.instructions || ""),
          userId: userId // Ensure your RecipesService.create handles this!
      });
    } catch (error) {
      console.error("❌ AI Generation Error:", error);
      throw new InternalServerErrorException("AI is currently cooking something else. Please try again in a moment! 🍳");
    }
  }
} 