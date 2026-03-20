"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import {
  Search,
  Plus,
  LogOut,
  Loader2,
  Leaf,
  Refrigerator,
  Github,
  Heart,
} from "lucide-react";

// --- COMPONENTS ---
import AiRecipeButton from "@/components/fridge/AiRecipeButton";
import ProductCard from "@/components/fridge/ProductCard";
import AddProductModal from "@/components/fridge/AddProductModal";

export default function SmartFridgePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

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

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p: any) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Could not delete item. Please try again. ❌");
    }
  };

  const handleProductAdded = (newProduct: any) => {
    setProducts((prev: any) => [newProduct, ...prev]);
  };

  const filteredProducts = products.filter((p: any) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0FDF4]">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-emerald-500 animate-spin" />
          <Leaf className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-600 w-6 h-6" />
        </div>
        <p className="mt-4 text-emerald-800 font-semibold tracking-wide animate-pulse">
          Syncing your eco-fridge...
        </p>
      </div>
    );
  }

  return (
    // Додаємо flex flex-col та min-h-screen, щоб футер був внизу
    <div className="flex flex-col min-h-screen bg-[#F7FBF9] text-slate-800">
      {/* --- HEADER --- */}
      <header className="bg-white/80 backdrop-blur-md px-8 py-4 flex justify-between items-center border-b border-emerald-100 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 p-2 rounded-xl text-white">
            <Leaf size={20} />
          </div>
          <h1 className="text-xl font-bold text-emerald-900 tracking-tight">
            Eco<span className="text-emerald-500">Fridge</span>
          </h1>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-2xl transition-all font-medium"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </header>

      {/* --- MAIN CONTENT (flex-grow розтягує контент) --- */}
      <main className="flex-grow max-w-6xl w-full mx-auto p-6 pb-20">
        {/* --- AI HERO SECTION --- */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[32px] p-8 md:p-12 text-white mb-10 shadow-xl shadow-emerald-200/50">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <span className="inline-block px-4 py-1 bg-emerald-400/30 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
                AI Assistant online ✨
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                Cook Consciously, <br /> Live Sustainably!
              </h2>
              <p className="text-emerald-50 text-lg mb-8 max-w-sm opacity-90">
                You have{" "}
                <span className="font-bold underline">
                  {products.length} items
                </span>{" "}
                in your fridge. Don't let them go to waste!
              </p>
              <AiRecipeButton />
            </div>
            <div className="hidden md:block opacity-20 transform rotate-12">
              <Refrigerator size={240} />
            </div>
          </div>
        </section>

        {/* --- ACTION BAR --- */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative group">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-400 group-focus-within:text-emerald-600 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search items in fridge..."
              className="w-full pl-14 pr-6 py-4 bg-white border border-emerald-50 rounded-2xl shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white px-8 py-4 rounded-2xl shadow-lg shadow-emerald-200 font-bold flex items-center justify-center gap-3 transition-all"
          >
            <Plus size={22} />
            <span>Add Product</span>
          </button>
        </div>

        {/* --- PRODUCT GRID --- */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((item: any) => (
              <ProductCard
                key={item.id}
                item={item}
                onDelete={() => handleDelete(item.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[32px] border-2 border-dashed border-emerald-100">
            <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Refrigerator className="text-emerald-300" size={40} />
            </div>
            <h3 className="text-xl font-bold text-emerald-900">
              Your fridge is empty...
            </h3>
            <p className="text-emerald-600/60 mt-2">
              Add your first item and let AI help you manage it!
            </p>
          </div>
        )}
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-emerald-100 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-100 p-1.5 rounded-lg text-emerald-600">
              <Leaf size={16} />
            </div>
            <span className="font-bold text-emerald-900">EcoFridge</span>
            <span className="text-slate-400 text-sm ml-2">
              © 2026 Sustainable Tech
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-500 text-sm font-medium">
            Made with{" "}
            <Heart size={16} className="text-red-400 fill-red-400 mx-1" /> for a
            greener planet
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-slate-400 hover:text-emerald-500 transition-colors"
            >
              <Github size={20} />
            </a>
            <div className="h-4 w-[1px] bg-slate-200"></div>
            <p className="text-xs text-slate-400 max-w-[150px] text-right hidden sm:block">
              Reducing food waste one fridge at a time.
            </p>
          </div>
        </div>
      </footer>

      {/* --- MODAL --- */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductAdded={handleProductAdded}
      />
    </div>
  );
}
