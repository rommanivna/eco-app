"use client";

import { useState } from "react";
import { X, Plus, Loader2 } from "lucide-react";
import api from "@/lib/axios";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: (product: any) => void;
}

export default function AddProductModal({
  isOpen,
  onClose,
  onProductAdded,
}: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Groceries");
  const [expiryDate, setExpiryDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/products", {
        name,
        category,
        expiryDate,
      });
      onProductAdded(response.data);
      onClose();
      // Reset form
      setName("");
      setExpiryDate("");
    } catch (err) {
      alert("Error adding product. Check your backend! 🍎");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex justify-center items-center p-4 backdrop-blur-md">
      <div className="bg-white rounded-[40px] p-10 w-full max-w-lg relative shadow-2xl border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-400 hover:text-red-500 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-black italic mb-2 tracking-tight">
          Stock Up!
        </h2>
        <p className="text-gray-400 mb-8">
          Add a new item to your smart fridge.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-4">
              Product Name
            </label>
            <input
              type="text"
              placeholder="e.g. Fresh Milk"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-4">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none appearance-none cursor-pointer"
              >
                <option value="Dairy">Dairy</option>
                <option value="Meat">Meat</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Groceries">Groceries</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-4">
                Expiry Date
              </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl active:scale-95 flex justify-center items-center gap-2 mt-4"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Plus size={20} /> Stock Fridge
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
