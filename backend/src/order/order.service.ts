import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async createOrder(userId: number, items: { foodId: number; quantity: number }[]) {
    let total = 0;

    const orderItems = await Promise.all(
      items.map(async (item) => {
        const food = await this.prisma.food.findUnique({
          where: { id: item.foodId },
        });

        if (!food || food.stock < item.quantity) {
          throw new BadRequestException('Not enough stock');
        }

        await this.prisma.food.update({
          where: { id: item.foodId },
          data: { stock: food.stock - item.quantity },
        });

        total += food.price * item.quantity;

        return {
          foodId: item.foodId,
          quantity: item.quantity,
          price: food.price,
        };
      }),
    );

    const order = await this.prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: orderItems,
        },
      },
    });
    return order;
  }

  async getOrders(userId: number, isAdmin: boolean, page: number = 1, limit: number = 10) {
    const skip = (parseInt(page.toString(), 10) - 1) * parseInt(limit.toString(), 10);


    const whereCondition = isAdmin ? {} : { userId };

    const totalOrders = await this.prisma.order.count({
      where: whereCondition,
    });

    const totalPages = Math.ceil(totalOrders / limit);

    const orders = await this.prisma.order.findMany({
      where: whereCondition,
      skip: skip,
      take: parseInt(limit.toString(), 10),
      include: {
        items: {
          include: {
            food: { select: { name: true } },
          },
        },
        user: true,
      },
    });

    return {
      orders,
      totalPages,
      currentPage: page,
    };
  }
}
