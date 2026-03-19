import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  // Функція для отримання моделі (ініціалізує ключ щоразу при виклику)
  private getModel(modelName: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("❌ КРИТИЧНА ПОМИЛКА: GEMINI_API_KEY не знайдено в .env!");
      throw new Error("API Key is missing. Check your .env file.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ 
      model: modelName,
      generationConfig: { 
        responseMimeType: "application/json",
        temperature: 0.7 
      }
    });
  }

  async generateRecipe(products: string[]): Promise<any> {
    try {
      console.log("🤖 Запит до 2.5 Flash для продуктів:", products);
      
      const model = this.getModel('gemini-2.5-flash');

      const prompt = `
        ROLE: Professional Chef.
        TASK: Create a recipe using: ${products.join(', ')}.
        FORMAT: Return ONLY JSON.
        JSON SCHEMA:
        {
          "title": "Recipe Name",
          "description": "Short summary",
          "ingredients": ["item 1", "item 2"],
          "instructions": "Step by step guide"
        }
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text().replace(/```json|```/g, '').trim();

      return JSON.parse(text); 
    } catch (error: any) {
      console.error("❌ Помилка генерації рецепта:", error?.message);
      throw new Error(`AI Recipe failed: ${error.message}`);
    }
  }

  // Оновлений метод для категорій (теж на 2.5 Flash)
  async detectCategoryAndCorrectName(productName: string): Promise<{ category: string; correctedName: string }> {
    try {
      const model = this.getModel('gemini-2.5-flash');
      
      const prompt = `
        Task: Given food item: "${productName}"
        Correct spelling and determine category (Meat, Fish, Dairy, Fruits, Vegetables, Bakery, Eggs, Beverages, Other).
        Return ONLY JSON: {"category": "Name", "correctedName": "Name"}
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text().replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(text);
      
      return { 
        category: parsed.category || 'Other', 
        correctedName: parsed.correctedName || productName 
      };
    } catch (error) {
      console.error("❌ Помилка аналізу продукту:", error);
      return { category: 'Other', correctedName: productName };
    }
  }
}