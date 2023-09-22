import { PartialType } from '@nestjs/mapped-types';
import { CreateShorterDto } from './create-shorter.dto';

export class UpdateShorterDto extends PartialType(CreateShorterDto) {}
