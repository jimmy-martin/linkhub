import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Link as LinkModel } from '@prisma/client';
import { Link } from 'src/entities';
import { CreateLinksDto, UpdateLinksDto } from './dto';
import { LinksService } from './links.service';

@Controller('links')
@ApiTags('Links')
export class LinksController {
  constructor(private readonly linksServices: LinksService) {}

  @ApiOperation({ summary: 'Get a link' })
  @ApiOkResponse({
    description: 'Returns a link',
    type: Link,
  })
  @Get(':id')
  find(@Param('id') id: number): Promise<LinkModel> {
    return this.linksServices.find(id);
  }

  @ApiOperation({ summary: 'Get all links' })
  @ApiOkResponse({
    description: 'Returns all links',
    type: Link,
    isArray: true,
  })
  @Get()
  findall(): Promise<LinkModel[]> {
    return this.linksServices.findAll();
  }

  @ApiOperation({ summary: 'Creates a link' })
  @ApiResponse({
    status: 201,
    description: 'The link has been successfully created.',
    type: Link,
  })
  @Post()
  create(@Body() dto: CreateLinksDto) {
    return this.linksServices.create(dto);
  }

  @ApiOperation({ summary: 'Updates a link' })
  @ApiOkResponse({
    description: 'The link has been successfully updated.',
  })
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateLinksDto,
  ): Promise<LinkModel> {
    return this.linksServices.update(id, dto);
  }

  @ApiOperation({ summary: 'Deletes a link' })
  @ApiOkResponse({
    description: 'The link has been successfully deleted.',
    type: Link,
  })
  @Delete(':id')
  delete(@Param('id') id: number): Promise<LinkModel> {
    return this.linksServices.delete(id);
  }
}
