import { ApiProperty } from '@nestjs/swagger';

export class UpdateLinksDto {
  @ApiProperty({ required: false, nullable: true })
  readonly name: string;

  @ApiProperty({ required: false, nullable: true })
  readonly url: string;

  @ApiProperty({ required: false, nullable: true })
  readonly categoryId: number;
}
