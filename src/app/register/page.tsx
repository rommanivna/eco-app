"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { motion } from "framer-motion"; // Для анімованого робота
import { Loader2, Lock, Mail, User, Leaf, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post("/auth/register", { email, password, name });
      router.push("/login");
    } catch (err) {
      alert("Registration failed. Maybe email is taken? 🍎");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#F7FBF9] p-4 overflow-hidden">
      {/* --- АНІМОВАНИЙ РОБОТ НА ФОНІ --- */}
      <motion.div
        initial={{ y: 20, x: 20 }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-10 md:right-20 opacity-20 pointer-events-none"
      >
        <div className="relative flex flex-col items-center">
          {/* Тіло робота */}
          <div className="w-24 h-24 bg-emerald-500 rounded-[30px] flex items-center justify-center shadow-lg shadow-emerald-200">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            </div>
          </div>
          {/* Рука, що махає */}
          <motion.div
            animate={{ rotate: [0, 40, 0, 40, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="absolute -left-4 top-8 w-8 h-4 bg-emerald-400 rounded-full origin-right"
          />
          <p className="mt-4 text-emerald-800 font-bold text-sm bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
            Hi! I'm EcoBot 🤖
          </p>
        </div>
      </motion.div>

      {/* --- КАРТКА РЕЄСТРАЦІЇ --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-[40px] shadow-xl shadow-emerald-100/50 p-10 border border-emerald-50 z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex bg-emerald-500 p-3 rounded-2xl mb-4 shadow-lg shadow-emerald-200">
            <Leaf className="text-white" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-emerald-900 tracking-tight">
            Create <span className="text-emerald-500">Account</span>
          </h1>
          <p className="text-slate-400 mt-2 font-medium">
            Start your sustainable journey today! 🌿
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-emerald-700/60 uppercase ml-4 tracking-wider">
              Full Name
            </label>
            <div className="relative group">
              <User
                className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-300 group-focus-within:text-emerald-500 transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="John Doe"
                className="w-full pl-14 pr-6 py-4 bg-emerald-50/30 border border-emerald-50 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all text-slate-700"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email Field */}
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
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field */}
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
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Sparkles size={18} />
                <span>Join Now</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-emerald-50 pt-8">
          <p className="text-slate-400 font-medium">
            Already a member?{" "}
            <Link
              href="/login"
              className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors underline decoration-emerald-200 decoration-2 underline-offset-4"
            >
              Log in here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
