import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PixDto {
  @ApiProperty({ example: 49.9, description: 'Valor total do pedido' })
  amount: number;

  @ApiPropertyOptional({
    example: 'ORDER-123',
    description: 'ID do pedido (opcional)',
  })
  transactionId?: string;
}
