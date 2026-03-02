// beverages/dto/create-beverage.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateBeverageDto {
  @ApiProperty({ example: 'Água Mineral PUREZA VITAL' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Águas' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({
    example:
      'Proveniente da fonte de Santa Bárbara, PUREZA VITAL é uma água pura e equilibrada naturalmente, sendo sua fonte de natureza preservada. ',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: '510ml' })
  @IsOptional()
  @IsString()
  capacity?: string;

  @ApiProperty({
    example: '173656237118448668813971162894-1080p.jpg',
  })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({ example: 6 })
  @IsNotEmpty()
  @IsNumber()
  value: number;
}
