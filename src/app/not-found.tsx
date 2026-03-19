import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-black text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Ой! Холодильник порожній
      </h2>
      <p className="text-gray-500 mb-8">
        Цієї сторінки не існує, але ваші продукти в безпеці. 🍎
      </p>
      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg"
      >
        Повернутися до Eco App
      </Link>
    </div>
  );
}
