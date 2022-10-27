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
import { Link as LinkModel } from '@prisma/client';
import { CreateLinksDto, UpdateLinksDto } from './dto';
import { LinksService } from './links.service';

@Controller('links')
@ApiTags('links')
export class LinksController {
  constructor(private readonly linksServices: LinksService) {}

  @Get(':id')
  @ApiOkResponse({ type: CreateLinksDto })
  find(@Param('id') id: number): Promise<LinkModel> {
    return this.linksServices.find(id);
  }

  @Get()
  @ApiOkResponse({ type: [CreateLinksDto] })
  findall(): Promise<LinkModel[]> {
    return this.linksServices.findAll();
  }

  @Post()
  @ApiCreatedResponse({ type: CreateLinksDto })
  create(@Body() dto: CreateLinksDto) {
    return this.linksServices.create(dto);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: UpdateLinksDto })
  update(
    @Param('id') id: number,
    @Body() dto: UpdateLinksDto,
  ): Promise<LinkModel> {
    return this.linksServices.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: [CreateLinksDto] })
  delete(@Param('id') id: number): Promise<LinkModel> {
    return this.linksServices.delete(id);
  }
}
