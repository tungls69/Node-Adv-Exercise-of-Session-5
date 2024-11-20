import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { join } from 'path';
import { writeFile } from 'fs/promises';

@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) { }


  async createCategory(name: string) {
    return this.prisma.category.create({
      data: {
        name,
      },
    });
  }

  async createFood(data: { name: string; description?: string; price: number; stock: number; categoryId: number; image?: string }) {
    console.log(data.description)
    return this.prisma.food.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
        image: process.env.BACKEND_URL + data.image,
      },
    });
  }

  async createFoodWithBase64(data: { name: string; description?: string; price: number; stock: number; categoryId: number; base64Image?: string }) {
    let imagePath = null;

    if (data.base64Image) {
      imagePath = await this.saveImage(data.base64Image);
    }

    console.log(data)
    return this.prisma.food.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
        image: imagePath,
      },
    });
  }

  async getPaginatedFoods(page: number, pageSize: number, category?: string, keyword?: string) {
    const skip = (page - 1) * pageSize;

    const where: any = {
      ...(category && { categoryId: parseInt(category) }),

      ...(keyword && {
        name: {
          contains: keyword,
          mode: 'insensitive',
        },
      }),
    };

    const totalItems = await this.prisma.food.count({
      where,
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    const foods = await this.prisma.food.findMany({
      where,
      skip,
      take: pageSize,
    });

    return {
      foods,
      totalPages,
    };
  }



  async searchFood(keyword: string) {
    return this.prisma.food.findMany({
      where: {
        name: {
          contains: keyword,
          mode: 'insensitive',
        },
      },
      include: { category: true },
    });
  }


  async getCategories() {
    return this.prisma.category.findMany();
  }

  async getFoodById(id: number) {
    return this.prisma.food.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async saveImage(base64: string): Promise<string> {
    const matches = base64.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!matches) {
      throw new BadRequestException('Invalid base64 format');
    }

    const extension = matches[1].split('/')[1];
    const data = matches[2];
    const fileName = `${Date.now()}.${extension}`;
    const filePath = join(__dirname, '../../public/images/foods', fileName);

    await writeFile(filePath, data, { encoding: 'base64' });

    return `/public/images/foods/${fileName}`;
  }

}
