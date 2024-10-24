import { PartialType } from '@nestjs/swagger';
import { CreateRestoranDto } from './create-restoran.dto';

export class UpdateRestoranDto extends PartialType(CreateRestoranDto) {}
