import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Category as CategoryModel } from '@prisma/client';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto, UpdateCategoriesDto } from './dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() dto: CreateCategoriesDto): Promise<CategoryModel> {
    return this.categoriesService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateCategoriesDto,
  ): Promise<CategoryModel> {
    return this.categoriesService.update(id, dto);
  }

  @Get()
  findAll(): Promise<CategoryModel[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: number): Promise<CategoryModel> {
    return this.categoriesService.find(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<CategoryModel> {
    return this.categoriesService.delete(id);
  }
}
