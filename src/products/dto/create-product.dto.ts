import { IsString, IsNotEmpty, IsOptional, MinLength, MaxLength, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString({ message: 'Name must be a string ✍️' })
  @IsNotEmpty({ message: 'Product name is required 🍎' })
  @MinLength(2, { message: 'Name is too short (minimum 2 characters)' })
  @MaxLength(50, { message: 'Name is too long (maximum 50 characters)' })
  // Видаляємо теги ТА зайві пробіли по боках
  @Transform(({ value }) => typeof value === 'string' ? value.replace(/<[^>]*>/g, '').trim() : value)
  name: string;

  @IsString({ message: 'Category must be a string' })
  @IsOptional()
  // Додаємо і сюди, щоб категорія теж була чистою
  @Transform(({ value }) => typeof value === 'string' ? value.replace(/<[^>]*>/g, '').trim() : value)
  category?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Expiry date must be a valid ISO date string (e.g., 2026-12-31)' })
  expiryDate?: string;
}