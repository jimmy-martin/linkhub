import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [LinksModule, PrismaModule],
  providers: [PrismaService],
})
export class AppModule {}
