"use client";
import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      // Зберігаємо токен, який ми бачили в Thunder Client
      localStorage.setItem("token", response.data.access_token);
      alert("Success! Token saved.");
      router.push("/"); // Летимо на головну
    } catch (err) {
      alert("Login failed. Check console.");
    }
  };

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl mb-4">Login to Smart Fridge 🍎</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 max-w-sm mx-auto"
      >
        <input
          className="border p-2 rounded"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Enter
        </button>
      </form>
    </div>
  );
}
