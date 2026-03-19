"use client";

import { useState } from "react";
import { Zap, Loader2 } from "lucide-react";
import api from "@/lib/axios";

export default function AiRecipeButton() {
  const [isLoading, setIsLoading] = useState(false);

  const generateRecipe = async () => {
    try {
      setIsLoading(true);

      // Викликаємо твій GET ендпоінт
      const response = await api.get("/ai/recipe");

      // Твій бекенд повертає об'єкт рецепта: { title, instructions, ... }
      const recipe = response.data;

      if (recipe.message) {
        alert(recipe.message); // Якщо холодильник порожній
      } else {
        alert(`👨‍🍳 Chef Suggests: ${recipe.title}\n\n${recipe.instructions}`);
      }
    } catch (err: any) {
      console.error("AI Error:", err);
      alert("AI is busy cooking for someone else. Try again! 🍳");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={generateRecipe}
      disabled={isLoading}
      className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-900/40 disabled:bg-slate-600 text-white"
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <Zap size={18} fill="currentColor" />
      )}
      <span>{isLoading ? "Thinking..." : "Generate AI Recipe"}</span>
    </button>
  );
}
