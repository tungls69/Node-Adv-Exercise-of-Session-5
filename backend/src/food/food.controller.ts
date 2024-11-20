import { BadRequestException, Body, Controller, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FoodService } from './food.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig, multerOptions } from 'src/multer/multer.config';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) { }


  @Post('categories')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async createCategory(@Body('name') name: string) {
    if (!name) {
      throw new BadRequestException('Category name is required');
    }
    return this.foodService.createCategory(name);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @UseInterceptors(FileInterceptor('image', { ...multerConfig, ...multerOptions }))
  async createFood(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { name: string; description?: string; price: number; stock: number; categoryId: number },
  ) {
    const { name, price, stock, categoryId, description } = body;

    if (!name || !price || !stock || !categoryId) {
      throw new Error('All fields are required');
    }


    const imagePath = `/public/images/foods/${file.filename}`;

    return this.foodService.createFood({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      categoryId: Number(categoryId),
      image: imagePath,
    });
  }

  // @Post('create-with-base64')
  // async createFoodWithBase64(@Body() body: {
  //   name: string;
  //   description?: string;
  //   price: number;
  //   stock: number;
  //   categoryId: number;
  //   base64Image?: string;
  // }) {
  //   const { name, price, stock, categoryId } = body;

  //   if (!name || !price || !stock || !categoryId) {
  //     throw new BadRequestException('All fields are required');
  //   }

  //   return this.foodService.createFoodWithBase64(body);
  // }

  @Get()
  async getPaginatedFoods(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('category') category: string,
    @Query('search') keyword: string,
  ) {

    const pageNumber = parseInt(page, 10) || 1;
    const size = parseInt(limit, 10) || 10;
    return this.foodService.getPaginatedFoods(pageNumber, size, category, keyword);
  }

  @Get('categories')
  async getCategories() {
    return this.foodService.getCategories();
  }

  @Get(':id')
  async getFoodById(@Param('id') id: string) {
    const foodId = parseInt(id, 10);
    return this.foodService.getFoodById(foodId);
  }

  @Get('search')
  async searchFood(@Query('keyword') keyword: string) {
    return this.foodService.searchFood(keyword);
  }

}
