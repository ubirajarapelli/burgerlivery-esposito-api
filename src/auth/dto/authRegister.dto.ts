import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Address } from 'src/user/entities/address.entity';

export class AuthRegisterDto {
  @ApiProperty({ example: 'Arthur Cavalcanti' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'arthur_cavalcanti@coraza.com.br' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senhaSecreta' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '679.620.748-33' })
  @IsString()
  @MinLength(14)
  @MaxLength(14)
  cpf: string;

  @ApiProperty({ example: 'customer' })
  @IsOptional()
  @IsString()
  role: string;

  @ApiProperty({
    example: {
      cep: '89010025',
      state: 'SC',
      city: 'Blumenau',
      neighborhood: 'Centro',
      street: 'Rua Doutor Luiz de Freitas Melro',
      number: '71',
    },
  })
  @IsOptional()
  @IsString()
  address?: Address;

  @ApiProperty({ example: '(11) 99165-7698' })
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  googleId: string;
}
