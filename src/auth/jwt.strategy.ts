import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Додаємо "|| 'secret'" або "as string", щоб заспокоїти TypeScript
      secretOrKey: process.env.JWT_SECRET || 'fallback-secret-key-replace-me',
    });
  }

  // 3. Цей метод спрацьовує, якщо токен валідний
  async validate(payload: { sub: string; email: string }) {
    // Шукаємо юзера за ID, який ми зашили в токен (поле sub)
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException('User not found 🚫');
    }

    // Видаляємо пароль перед тим як повернути об'єкт
    const { password, ...result } = user;

    // Тепер у контролері ми зможемо отримати ці дані через req.user
    return result;
  }
}