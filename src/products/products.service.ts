import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AiService } from '../ai/ai.service';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => AiService))
    private aiService: AiService,
  ) {}

  private readonly categoryExpiryMap: Record<string, number> = {
    'Meat': 3,
    'Fish': 2,
    'Dairy': 5,
    'Fruits': 7,
    'Vegetables': 10,
    'Bakery': 3,
    'Eggs': 21,
    'Beverages': 14,
    'Other': 7,
  };

  async create(data: CreateProductDto & { userId: string }) {
    let category = data.category;
    let finalName = data.name;

    // 🤖 МАГІЯ AI: Виправляємо назву і визначаємо категорію
    if (!category || category === 'Other') {
      const aiResult = await this.aiService.detectCategoryAndCorrectName(data.name);
      category = aiResult.category;
      finalName = aiResult.correctedName;
    }

    let expiryDate: Date;

    // Логіка визначення дати
    if (data.expiryDate) {
      expiryDate = new Date(data.expiryDate);
      if (isNaN(expiryDate.getTime())) {
        const daysToAdd = this.categoryExpiryMap[category] || 7;
        expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + daysToAdd);
      }
    } else {
      const daysToAdd = this.categoryExpiryMap[category] || 7;
      expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + daysToAdd);
    }

    return this.prisma.product.create({
      data: {
        name: finalName, // Зберігаємо вже виправлену назву (наприклад, "Milk")
        category: category, 
        expiryDate: expiryDate,
        userId: data.userId,
      },
    });
  }

  async findAll(userId: string) {
    const products = await this.prisma.product.findMany({
      where: { userId },
      orderBy: { expiryDate: 'asc' },
    });

    if (!products || products.length === 0) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return products.map((product) => {
      const expiry = new Date(product.expiryDate);
      const diffTime = expiry.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return {
        ...product,
        daysLeft: diffDays,
        isExpired: diffDays < 0,
      };
    });
  }

  async remove(id: string) {
    try {
      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
  }
}