// desserts/dto/update-dessert.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateDessertDto } from './createDessert.dto';

export class UpdateDessertDto extends PartialType(CreateDessertDto) {}
