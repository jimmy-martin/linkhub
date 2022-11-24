import { ApiProperty } from '@nestjs/swagger';
import { Link } from './link.entity';

export class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false })
  links?: Link[];
}
