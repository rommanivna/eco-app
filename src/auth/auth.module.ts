import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    JwtModule.register({
      global: true, // Щоб токени працювали в усьому додатку
      secret: process.env.JWT_SECRET || 'secret', // Наш ключ
      signOptions: { expiresIn: '1h' }, // Квиток діє 1 годину
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}