import { Injectable } from '@nestjs/common';
import { Link as LinkModel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLinksDto, UpdateLinksDto } from './dto';

@Injectable()
export class LinksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateLinksDto): Promise<LinkModel> {
    const { name, url, categoryId } = dto;
    const link = await this.prismaService.link.create({
      data: {
        name,
        url,
        categoryId: Number(categoryId),
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return link;
  }

  async update(id: number, dto: UpdateLinksDto): Promise<LinkModel> {
    const link = await this.prismaService.link.update({
      where: {
        id: Number(id),
      },
      data: {
        ...dto,
      },
    });

    return link;
  }

  async findAll(): Promise<LinkModel[]> {
    const links = await this.prismaService.link.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return links;
  }

  async find(id: number): Promise<LinkModel | null> {
    const link = await this.prismaService.link.findUniqueOrThrow({
      where: { id: Number(id) },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return link;
  }

  async delete(id: number): Promise<LinkModel> {
    return await this.prismaService.link.delete({
      where: { id: Number(id) },
    });
  }
}
