import { Injectable } from '@nestjs/common';
import { Link as LinkModel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLinksDto, UpdateLinksDto } from './dto';

@Injectable()
export class LinksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateLinksDto): Promise<LinkModel> {
    const { name, url, categoryId } = dto;
    return await this.prismaService.link.create({
      data: {
        name,
        url,
        categoryId: categoryId ? Number(categoryId) : null,
      },
      include: {
        category: {},
      },
    });
  }

  async update(id: number, dto: UpdateLinksDto): Promise<LinkModel> {
    return await this.prismaService.link.update({
      where: {
        id: Number(id),
      },
      data: {
        ...dto,
      },
    });
  }

  async findAll(): Promise<LinkModel[]> {
    return await this.prismaService.link.findMany({
      include: {
        category: {},
      },
    });
  }

  async find(id: number): Promise<LinkModel> {
    return await this.prismaService.link.findUniqueOrThrow({
      where: { id: Number(id) },
      include: {
        category: {},
      },
    });
  }

  async delete(id: number): Promise<LinkModel> {
    return await this.prismaService.link.delete({
      where: { id: Number(id) },
    });
  }
}
