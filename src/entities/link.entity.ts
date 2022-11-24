import { ApiProperty } from '@nestjs/swagger';
import { Category } from './category.entity';
import { User } from './user.entity';

export class Link {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false })
  categoryId?: number;

  @ApiProperty({ required: false })
  category?: Category;

  @ApiProperty()
  user: User;
}
