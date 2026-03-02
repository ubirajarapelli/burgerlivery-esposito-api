// desserts/dto/create-dessert.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateDessertDto {
  @ApiProperty({ example: 'Mousse de Chocolate' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example:
      'Um clássico cremoso, intenso e aveludado, leva chocolate meio amargo, creme de cacau e é finalizado com lascas de chocolate. ',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: '120g' })
  @IsNotEmpty()
  @IsString()
  capacity: string;

  @ApiProperty({
    example: 'https://cdn.accon.app/160703524378446868449857053296-1080p.jpg',
  })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({ example: 21.9 })
  @IsNotEmpty()
  @IsNumber()
  value: number;
}
