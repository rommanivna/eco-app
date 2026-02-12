import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Тільки реальний сервіс!
import { CreateProductDto } from './dto/create-product.dto'; // Імпортуємо DTO для створення продукту

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const products = await this.prisma.product.findMany();
    
    if (!products || products.length === 0) return [];

    return products.map(product => {
      const today = new Date();
      const expiry = new Date(product.expiryDate);
      const diffTime = expiry.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      return {
        ...product,
        daysLeft: diffDays,
        isExpired: diffDays < 0
      };
    });
  }

  async create(data: CreateProductDto) {
    let expiryDate: Date;
    if (data.expiryDate) {
      expiryDate = new Date(data.expiryDate);
    }else {// Якщо дата не вказана, встановлюємо її на 7 днів вперед
      expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);
    }

    if (isNaN(expiryDate.getTime())) {
      expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);
    }

    return this.prisma.product.create({
      data: {
        name: data.name,
        category: data.category || "Uncategorized",
        expiryDate: expiryDate,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}