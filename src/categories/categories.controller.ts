import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Category as CategoryModel, Link as LinkModel } from '@prisma/client';
import { Category, Link } from 'src/entities';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto, UpdateCategoriesDto } from './dto';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Get a category' })
  @ApiOkResponse({
    description: 'Returns a category',
    type: Category,
  })
  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number): Promise<CategoryModel> {
    return this.categoriesService.find(+id);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({
    description: 'Returns all categories',
    type: Category,
    isArray: true,
  })
  @Get()
  findAll(): Promise<CategoryModel[]> {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Creates a category' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The category has been successfully created.',
    type: Category,
  })
  @Post()
  create(@Body() dto: CreateCategoriesDto): Promise<CategoryModel> {
    return this.categoriesService.create(dto);
  }

  @ApiOperation({ summary: 'Updates a category' })
  @ApiOkResponse({
    description: 'The category has been successfully updated.',
    type: Category,
  })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoriesDto,
  ): Promise<CategoryModel> {
    return this.categoriesService.update(+id, dto);
  }

  @ApiOperation({ summary: 'Deletes a category' })
  @ApiOkResponse({
    description: 'The category has been successfully deleted.',
    type: Category,
  })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<CategoryModel> {
    return this.categoriesService.delete(+id);
  }

  @ApiOperation({ summary: 'Get all links associated with a category' })
  @ApiOkResponse({
    description: 'Returns all links associated with a category.',
    type: Link,
    isArray: true,
  })
  @Get(':id/links')
  findAllAssociatedLinks(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<LinkModel[]> {
    return this.categoriesService.findAllAssociatedLinks(+id);
  }
}
