"use client";

import { Refrigerator, Trash2, Clock, ChevronRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  expiryDate: string;
}

interface Props {
  item: Product;
  onDelete: (id: string) => void;
}

export default function ProductCard({ item, onDelete }: Props) {
  return (
    <div className="group bg-white p-6 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-blue-100 relative">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
          <Refrigerator size={24} />
        </div>
        <button
          onClick={() => onDelete(item.id)}
          className="p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-1">{item.name}</h3>
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
        {item.category || "Grocery"}
      </span>

      <div className="mt-6 pt-6 border-t border-dashed border-gray-100 flex justify-between items-center text-gray-500">
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span className="text-sm font-medium">
            Expires: {new Date(item.expiryDate).toLocaleDateString()}
          </span>
        </div>
        <ChevronRight
          size={20}
          className="text-gray-300 group-hover:text-blue-500 transition-colors"
        />
      </div>
    </div>
  );
}
