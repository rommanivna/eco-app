import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

// Додайте цей рядок ПЕРЕД класом, щоб завантажити змінні з .env
dotenv.config();

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const pool = new Pool({ 
      // Тепер тут буде рядок з .env, а не undefined
      connectionString: process.env.DATABASE_URL 
    });
    
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Connected to database');
    } catch (e) {
      console.error('❌ Connection error:', e);
    }
  }
}
