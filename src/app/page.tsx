"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Plus, Home, User, Search } from "lucide-react";

export default function InventoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");

      // Якщо токена немає — відправляємо на сторінку логіна
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Помилка при завантаженні продуктів:", error);
        // Якщо токен протух або невірний — теж на логін
        router.push("/login");
      }
    };

    fetchProducts();
  }, [router]);

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="relative w-full max-w-md bg-white min-h-screen shadow-xl flex flex-col">
        {/* Твій існуючий UI з Header та списком продуктів */}
        <div className="p-6">
          <h1 className="text-2xl font-bold italic">Smart Fridge 🍎</h1>
        </div>

        <div className="mt-auto bg-[#E3F2FD] rounded-t-[40px] p-8 min-h-400">
          <h2 className="text-center font-medium mb-6 text-gray-700">
            Current products...
          </h2>
          {products.length === 0 ? (
            <p className="text-center text-gray-500">Fridge is empty 🥛</p>
          ) : (
            products.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 mb-4 bg-white p-3 rounded-2xl shadow-sm"
              >
                <div className="text-2xl">
                  {item.category === "Dairy" ? "🥛" : "🍏"}
                </div>
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-xs text-gray-400">
                    Expires in {item.daysLeft} days
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
