import { Injectable } from '@nestjs/common';
import { Link as LinkModel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LinksService {
  constructor(private readonly prismaService: PrismaService) {}

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
}
