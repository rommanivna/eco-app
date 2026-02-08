import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// Це змусить Prisma CLI бачити ваш DATABASE_URL з файлу .env
dotenv.config();

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
