import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { AddressDto } from './address.dto';

export class CreateUserDto {
  @ApiProperty({ example: 'Eduardo Chagas' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'eduardochagas@pizzalivery.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Senha123@' })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '123.456.789-00' })
  @IsString()
  @MinLength(14)
  @MaxLength(14)
  cpf: string;

  @ApiProperty({ example: 'customer' })
  @IsOptional()
  @IsString()
  role: string;

  @ApiProperty({ example: 'customer' })
  @IsOptional()
  @IsString()
  address?: AddressDto;

  @ApiProperty({ example: '(11) 99165-7698' })
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  googleId: string;
}
