import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Дозволяємо запити з інших портів (наприклад, з твого майбутнього React на 5173)
  app.enableCors();

  await app.listen(3000);
  
  // Використовуємо кавичку `, щоб бачити реальний порт, якщо він зміниться
  console.log(`✅ Server is running on: http://localhost:3000`);
  console.log(`🍎 Try to get products: http://localhost:3000/products`);
}
bootstrap();