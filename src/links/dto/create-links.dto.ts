import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLinksDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly url: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly categoryId: number;
}
