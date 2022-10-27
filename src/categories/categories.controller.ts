import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Category as CategoryModel } from '@prisma/client';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto, UpdateCategoriesDto } from './dto';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get(':id')
  @ApiOkResponse({ type: [CreateCategoriesDto] })
  find(@Param('id') id: number): Promise<CategoryModel> {
    return this.categoriesService.find(id);
  }

  @Get()
  @ApiOkResponse({ type: [CreateCategoriesDto] })
  findAll(): Promise<CategoryModel[]> {
    return this.categoriesService.findAll();
  }

  @Post()
  @ApiCreatedResponse({ type: CreateCategoriesDto })
  create(@Body() dto: CreateCategoriesDto): Promise<CategoryModel> {
    return this.categoriesService.create(dto);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: UpdateCategoriesDto })
  update(
    @Param('id') id: number,
    @Body() dto: UpdateCategoriesDto,
  ): Promise<CategoryModel> {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: [UpdateCategoriesDto] })
  delete(@Param('id') id: number): Promise<CategoryModel> {
    return this.categoriesService.delete(id);
  }
}
