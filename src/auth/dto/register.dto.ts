import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Please provide a valid email address 📧' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long 🔐' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
}