import { Injectable } from '@nestjs/common';
import { Link as LinkModel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLinksDto, UpdateLinksDto } from './dto';

@Injectable()
export class LinksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateLinksDto): Promise<LinkModel> {
    const { name, url, categoryId, userId } = dto;
    return await this.prismaService.link.create({
      data: {
        name,
        url,
        categoryId: categoryId ?? null,
        userId,
      },
      include: { category: {} },
    });
  }

  async update(id: number, dto: UpdateLinksDto): Promise<LinkModel> {
    return await this.prismaService.link.update({
      where: { id },
      data: { ...dto },
      include: { category: {} },
    });
  }

  async findAll(): Promise<LinkModel[]> {
    return await this.prismaService.link.findMany({
      include: { category: {} },
    });
  }

  async find(id: number): Promise<LinkModel> {
    return await this.prismaService.link.findUniqueOrThrow({
      where: { id },
      include: { category: {} },
    });
  }

  async delete(id: number): Promise<LinkModel> {
    return await this.prismaService.link.delete({
      where: { id },
      include: { category: {} },
    });
  }
}
