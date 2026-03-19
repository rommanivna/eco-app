"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 1. Відправляємо запит на бекенд
      const response = await api.post("/auth/login", { email, password });

      // 2. Зберігаємо токен (Response.data.access_token)
      localStorage.setItem("token", response.data.access_token);

      // 3. Летимо в холодильник!
      router.push("/");
    } catch (err: any) {
      setError("Невірний логін або пароль ❌");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black italic text-gray-900 tracking-tight">
            Eco App
          </h1>
          <p className="text-gray-400 mt-2">
            З поверненням до свого холодильника! 🍏
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <p className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-xl">
              {error}
            </p>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase ml-4">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-300" size={20} />
              <input
                type="email"
                placeholder="anastasiia@mail.com"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase ml-4">
              Пароль
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-300" size={20} />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-5 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all shadow-lg active:scale-95 disabled:bg-gray-300 flex justify-center items-center"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Увійти"}
          </button>
        </form>
      </div>
    </div>
  );
}
