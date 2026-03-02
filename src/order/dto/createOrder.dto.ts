import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  ValidateIf,
  Validate,
  ValidationArguments,
  IsOptional,
  IsNumber,
  IsString,
} from 'class-validator';

class AtLeastOneArrayNotEmpty {
  validate(_: any, args: ValidationArguments) {
    const object = args.object as CreateOrderDto;
    return [object.pizzaIds, object.beverageIds, object.dessertIds].some(
      (arr) => Array.isArray(arr) && arr.length > 0,
    );
  }
  defaultMessage() {
    return 'O pedido deve conter ao menos uma pizza, sobremesa ou bebida.';
  }
}

export class CreateOrderDto {
  @ApiProperty({ example: '9e162a18-1e23-4594-9d3d-bf5f893fbf0f' })
  @IsInt()
  userId: string;

  @ApiProperty({ example: [0, 4] })
  @IsArray()
  @ValidateIf((order: CreateOrderDto) => order.pizzaIds !== undefined)
  pizzaIds?: number[];

  @ApiProperty({ example: [55] })
  @IsArray()
  @ValidateIf((order: CreateOrderDto) => order.beverageIds !== undefined)
  beverageIds?: number[];

  @ApiProperty({ example: [] })
  @IsArray()
  @ValidateIf((order: CreateOrderDto) => order.dessertIds !== undefined)
  dessertIds?: number[];

  @Validate(AtLeastOneArrayNotEmpty)
  itemsValidator: any; // Propriedade dummy para rodar a validação customizada

  @IsOptional()
  @IsNumber()
  totalValue?: number;

  @IsString()
  deliveryAddress: string;
}
