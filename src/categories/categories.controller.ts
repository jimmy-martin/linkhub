import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Category as CategoryModel } from '@prisma/client';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto, UpdateCategoriesDto } from './dto';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get(':id')
  find(@Param('id') id: number): Promise<CategoryModel> {
    return this.categoriesService.find(id);
  }

  @Get()
  findAll(): Promise<CategoryModel[]> {
    return this.categoriesService.findAll();
  }

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

  @Delete(':id')
  delete(@Param('id') id: number): Promise<CategoryModel> {
    return this.categoriesService.delete(id);
  }
}
