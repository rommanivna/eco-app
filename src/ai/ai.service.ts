import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  async generateRecipe(products: string[]) {
    try {
      // ВИКОРИСТОВУЄМО ТВОЮ МОДЕЛЬ ЗІ СПИСКУ
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      const prompt = `
      ROLE: You are a professional Chef in Eco-app designed to minimize food waste. 
      CONTEXT: The user has a specific list of ingredients in their fridge. 
      GOAL: Suggest a creative, healthy, and easy-to-follow recipe using provided ingredients.
      AVAILABLE INGREDIENTS: [${products.join(', ')}]

     RULES:
      1. Use the ingredients listed above.
      2. You may assume the user has basic pantry staples: water, salt, black pepper, and cooking oil.
      3. If the ingredients are insufficient to make a meal (e.g., only milk), politely inform the user and suggest what basic ingredient they might add.
      4. Format the output clearly using Markdown:
         - **Recipe Name**
         - **Prep Time**
         - **Ingredients Used**
         - **Step-by-step Instructions**
      5. The entire response must be in English.
    `;

      console.log("🤖 Запит до Gemini 2.5 Flash відправлено...");
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      console.log("✅ Рецепт отримано:", text);
      return text;
    } catch (error) {
      console.error("❌ Помилка AI:", error.message);
      return `Сталася помилка: ${error.message}`;
    }
  }
}