"use client";

import Link from "next/link";
import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail, Leaf } from "lucide-react";

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
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.access_token);
      router.push("/");
    } catch (err: any) {
      setError("Invalid email or password ❌");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F7FBF9] p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-xl shadow-emerald-100/50 p-10 border border-emerald-50">
        {/* --- LOGO & WELCOME --- */}
        <div className="text-center mb-10">
          <div className="inline-flex bg-emerald-500 p-3 rounded-2xl mb-4 shadow-lg shadow-emerald-200">
            <Leaf className="text-white" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-emerald-900 tracking-tight">
            Eco<span className="text-emerald-500">Fridge</span>
          </h1>
          <p className="text-slate-400 mt-2 font-medium">
            Welcome back to your smart kitchen! 🍏
          </p>
        </div>

        {/* --- LOGIN FORM --- */}
        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-500 text-sm text-center font-medium py-3 rounded-2xl animate-shake">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-emerald-700/60 uppercase ml-4 tracking-wider">
              Email Address
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-300 group-focus-within:text-emerald-500 transition-colors"
                size={20}
              />
              <input
                type="email"
                placeholder="hello@ecofridge.com"
                className="w-full pl-14 pr-6 py-4 bg-emerald-50/30 border border-emerald-50 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all text-slate-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-emerald-700/60 uppercase ml-4 tracking-wider">
              Password
            </label>
            <div className="relative group">
              <Lock
                className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-300 group-focus-within:text-emerald-500 transition-colors"
                size={20}
              />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-14 pr-6 py-4 bg-emerald-50/30 border border-emerald-50 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all text-slate-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200 active:scale-95 disabled:bg-emerald-200 flex justify-center items-center gap-2 mt-4"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
          </button>
        </form>

        {/* --- SIGNUP LINK --- */}
        <div className="mt-8 text-center border-t border-emerald-50 pt-8">
          <p className="text-slate-400 font-medium">
            New here?{" "}
            <Link
              href="/register"
              className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors underline decoration-emerald-200 decoration-2 underline-offset-4"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
