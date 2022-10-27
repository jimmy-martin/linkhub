import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';

@Module({
  controllers: [LinksController],
  providers: [LinksService],
  imports: [PrismaModule],
})
export class LinksModule {}
