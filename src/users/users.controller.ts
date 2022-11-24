import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';
import { User } from 'src/entities';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get a user' })
  @ApiOkResponse({
    description: 'Returns a user',
    type: User,
  })
  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.usersService.find(id);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'Returns all users',
    type: User,
    isArray: true,
  })
  @Get()
  findAll(): Promise<UserModel[]> {
    return this.usersService.findAll();
  }
}
