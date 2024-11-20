import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FoodModule } from './food/food.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}), PrismaModule, AuthModule, FoodModule, OrderModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
