import { Injectable } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<UserModel[]> {
    return await this.prismaService.user.findMany({});
  }

  async find(id: number): Promise<UserModel> {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });
  }
}
