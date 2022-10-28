import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/dto';

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

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  category: Category;
}
