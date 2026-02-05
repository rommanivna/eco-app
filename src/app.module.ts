import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './app.service';

@Module({
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}