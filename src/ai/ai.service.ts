import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  async detectCategoryAndCorrectName(productName: string): Promise<{ category: string; correctedName: string }> {
    const model = this.genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: { responseMimeType: "application/json" } // Примусово просимо JSON
    });
    
    const prompt = `
    Task: Given food item: "${productName}"
    1. Correct spelling typos (e.g., "mlik" -> "Milk").
    2. Determine category: Meat, Fish, Dairy, Fruits, Vegetables, Bakery, Eggs, Beverages, Other.
    Return ONLY a JSON object:
    {
      "category": "CategoryName",
      "correctedName": "CorrectedName"
    }
  `;

    try {
      console.log(`🤖 AI аналізує: ${productName}...`);
      const result = await model.generateContent(prompt);
      let text = result.response.text().trim();

      // Очистка від можливих маркдаун-тегів ```json ... ```
      text = text.replace(/```json|```/g, '');

      const parsed = JSON.parse(text);
      
      return { 
        category: parsed.category?.trim() || 'Other', 
        correctedName: parsed.correctedName?.trim() || productName 
      };
    } catch (error: any) {
      console.error("❌ Помилка AI:", error?.message);
      return { category: 'Other', correctedName: productName }; 
    }
  }

  async generateRecipe(products: string[]): Promise<any> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json",
        },
      });

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

      console.log("🤖 Запит на рецепт відправлено...");
      const result = await model.generateContent(prompt);
      let text = result.response.text().trim();
      text = text.replace(/```json|```/g, '');

      return JSON.parse(text); 
    } catch (error: any) {
      console.error("❌ Помилка генерації рецепта:", error?.message);
      throw new Error(`AI Recipe failed: ${error.message}`);
    }
  }
}