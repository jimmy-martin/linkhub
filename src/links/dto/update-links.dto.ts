import { PartialType } from '@nestjs/swagger';
import { CreateLinksDto } from './create-links.dto';

export class UpdateLinksDto extends PartialType(CreateLinksDto) {}
