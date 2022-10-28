import { Injectable } from '@nestjs/common';
import { Category as CategoryModel, Link as LinkModel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoriesDto, UpdateCategoriesDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateCategoriesDto): Promise<CategoryModel> {
    const { name } = dto;
    return await this.prismaService.category.create({ data: { name } });
  }

  async update(id: number, dto: UpdateCategoriesDto): Promise<CategoryModel> {
    const { name } = dto;
    return await this.prismaService.category.update({
      where: { id },
      data: { name },
    });
  }

  async findAll(): Promise<CategoryModel[]> {
    return await this.prismaService.category.findMany();
  }

  async find(id: number): Promise<CategoryModel> {
    return await this.prismaService.category.findUniqueOrThrow({
      where: { id },
    });
  }

  async delete(id: number): Promise<CategoryModel> {
    return await this.prismaService.category.delete({ where: { id } });
  }

  async findAllAssociatedLinks(id: number): Promise<LinkModel[]> {
    return await this.prismaService.link.findMany({
      where: { categoryId: id },
      include: { category: {} },
    });
  }
}
