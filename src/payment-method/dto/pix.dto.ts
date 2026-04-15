import { ApiProperty } from '@nestjs/swagger';

export class PixDto {
  @ApiProperty({ example: 49.9, description: 'Valor total do pedido' })
  amount: number;

  @ApiProperty({
    example: 'ORDER-123',
    description: 'ID do pedido (opcional)',
    required: false,
  })
  transactionId?: string;
}
