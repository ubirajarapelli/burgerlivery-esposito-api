// beverages/dto/update-beverage.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateBeverageDto } from './createBeverage.dto';

export class UpdateBeverageDto extends PartialType(CreateBeverageDto) {}
