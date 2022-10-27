import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [LinksModule, PrismaModule, CategoriesModule],
  providers: [PrismaService],
})
export class AppModule {}
