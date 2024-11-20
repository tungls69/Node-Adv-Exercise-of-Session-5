import { Body, Controller, Post, Get, Query, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Role } from '@prisma/client'; // Assuming your Role enum is in Prisma model

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Body() body: { items: { foodId: number; quantity: number }[] },
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.orderService.createOrder(userId, body.items);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getOrders(
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10,
    @Req() req: any
  ) {
    const userId = req.user.id;
    const isAdmin = req.user.role === Role.ADMIN;
    return this.orderService.getOrders(userId, isAdmin, skip, limit);
  }
}
