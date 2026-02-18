import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000", // Пряме посилання на NestJS порт
  headers: {
    "Content-Type": "application/json",
  },
});

// Додаємо перехоплювач, щоб автоматично підставляти токен
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;