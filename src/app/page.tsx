"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Search, Plus, LogOut, Loader2 } from "lucide-react";

// --- ІМПОРТ ТВОЇХ КОМПОНЕНТІВ ---
import AiRecipeButton from "@/components/fridge/AiRecipeButton";
import ProductCard from "@/components/fridge/ProductCard";
import AddProductModal from "@/components/fridge/AddProductModal";

export default function SmartFridgePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Завантаження продуктів з бекенду
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p: any) => p.id !== id));
  };

  const handleProductAdded = (newProduct: any) => {
    setProducts((prev: any) => [...prev, newProduct]);
  };

  // Фільтрація для пошуку
  const filteredProducts = products.filter((p: any) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-400 font-medium animate-pulse">
          Syncing your fridge...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-900 pb-20">
      {/* --- HEADER --- */}
      <header className="bg-white px-8 py-6 flex justify-between items-center border-b border-gray-100 sticky top-0 z-50">
        <h1 className="text-2xl font-black italic tracking-tighter uppercase">
          Eco App
        </h1>
        <button
          onClick={handleLogout}
          className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"
        >
          <LogOut size={20} />
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        {/* --- AI SECTION --- */}
        <section className="bg-slate-900 rounded-[40px] p-10 text-white mb-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Smart Assistant 👋</h2>
            <p className="text-slate-400 mb-8 max-w-md">
              Let AI analyze your {products.length} products and suggest an
              eco-friendly recipe.
            </p>
            <AiRecipeButton />
          </div>
        </section>

        {/* --- ACTION BAR --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-5 top-5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search in fridge..."
              className="w-full pl-14 pr-6 py-5 bg-white border-none rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white hover:bg-blue-50 p-5 rounded-3xl shadow-sm text-blue-600 font-bold flex items-center justify-center gap-2 transition-all shadow-blue-100"
          >
            <Plus size={24} />
            <span>Add Item</span>
          </button>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((item: any) => (
            <ProductCard key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      </main>

      {/* --- MODAL --- */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductAdded={handleProductAdded}
      />
    </div>
  );
}
// npx next dev
