import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Address } from 'src/user/entities/address.entity';

export class CreateBackofficeUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(14)
  @MaxLength(14)
  cpf: string;

  @IsOptional()
  @IsString()
  address?: Address;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  googleId: string;
}
