import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { Recipe } from '@prisma/client'; 

@Injectable()
export class RecipesService {
    constructor(private prisma: PrismaService) {} 

    async remove(id: string): Promise<Recipe> {
        return this.prisma.recipe.delete({
            where: { id },
        });
    } catch (error: any) {
        console.error("❌ Помилка видалення рецепту:", error?.message ?? error);
        throw new Error(`Сталася помилка при видаленні рецепту: ${error?.message ?? error}`);
    }

    async create(data: {
        title: string;        // БУЛО: titile (виправили ✅)
        description: string;
        ingredients: string[];
        instructions: string;
        userId: string; // Твій Prisma тип очікує String, а не String[] ✅
    }): Promise<Recipe> {
        return this.prisma.recipe.create({
            data: {
                ...data,
                isAiGenerated: true,
            },
        });
    }

    async findOne(id: string): Promise<Recipe | null> {
        return this.prisma.recipe.findUnique({
            where: { id },
        });
    }

    // Додамо findAll, щоб ти могла бачити всі свої шедеври
    async findAll(): Promise<Recipe[]> {
        return this.prisma.recipe.findMany();
    }
}