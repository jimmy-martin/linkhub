import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Link as LinkModel } from '@prisma/client';
import { CreateLinksDto, UpdateLinksDto } from './dto';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(private readonly linksServices: LinksService) {}

  @Get(':id')
  find(@Param('id') id: number): Promise<LinkModel> {
    return this.linksServices.find(id);
  }

  @Get()
  findall(): Promise<LinkModel[]> {
    return this.linksServices.findAll();
  }

  @Post()
  create(@Body() dto: CreateLinksDto) {
    return this.linksServices.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateLinksDto,
  ): Promise<LinkModel> {
    return this.linksServices.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<LinkModel> {
    return this.linksServices.delete(id);
  }
}
