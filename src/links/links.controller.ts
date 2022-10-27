import { Controller, Get, Param } from '@nestjs/common';
import { Link as LinkModel } from '@prisma/client';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(private readonly linksServices: LinksService) {}

  @Get()
  findall(): Promise<LinkModel[]> {
    return this.linksServices.findAll();
  }

  @Get(':id')
  find(@Param('id') id: number): Promise<LinkModel | null> {
    return this.linksServices.find(id);
  }
}
