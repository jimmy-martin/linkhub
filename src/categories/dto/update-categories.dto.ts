import { IsNotEmpty } from 'class-validator';

export class UpdateCategoriesDto {
  @IsNotEmpty()
  readonly name: string;
}
