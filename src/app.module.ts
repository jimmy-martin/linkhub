import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [LinksModule, PrismaModule, CategoriesModule, AuthModule, UsersModule],
  providers: [PrismaService],
})
export class AppModule {}
