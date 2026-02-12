import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  async generateRecipe(products: string[]): Promise<any> {
    try {
      // ВИКОРИСТОВУЄМО ТВОЮ МОДЕЛЬ ЗІ СПИСКУ
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        generationConfig: {
          temperature: 0.7, // Трохи креативності
          responseMimeType: "application/json", // Чіткий формат для парсингу
        },
      });

      const prompt = `
    ROLE: Professional Chef.
    TASK: Create a recipe from these ingredients: ${products.join(', ')}.
    FORMAT: Return ONLY JSON.
    JSON SCHEMA:
    {
      "title": "Recipe Name",
      "description": "Short teaser",
      "ingredients": ["item 1", "item 2"],
      "instructions": "Detailed steps..."
    }
  `;

      console.log("🤖 Запит до Gemini 2.5 Flash відправлено...");
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      console.log("✅ Рецепт отримано:", text);
      return JSON.parse(text); // ПАРСИМО ВІДПОВІДЬ ЯК JSON
    } catch (error: any) {
      console.error("❌ Помилка AI:", error?.message ?? error);
      return `Сталася помилка: ${error?.message ?? error}`;
    }
  }
}