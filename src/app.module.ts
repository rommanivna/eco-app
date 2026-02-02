import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AppController } from './app.controller';  

@Global() // дуже важливо
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  controllers: [AppController],
  imports: [],
})
export class PrismaModule {}
export class AppModule {}
