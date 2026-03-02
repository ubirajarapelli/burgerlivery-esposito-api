// desserts/dto/delete-dessert.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteDessertDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
