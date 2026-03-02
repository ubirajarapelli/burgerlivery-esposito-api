import { ApiProperty } from '@nestjs/swagger';

export class CreatePizzaDto {
  @ApiProperty({ example: 'Sampa' })
  name: string;

  @ApiProperty({ example: ['large', 'small'] })
  size: string[];

  @ApiProperty({ example: 'Tradicional' })
  category: string;

  @ApiProperty({
    example:
      'Uma homenagem à mistura de culturas e leva calabresa defumada sobre muçarela especial fresca, coberta por Catupiry®. Finalizada com anéis de cebola roxa, um toque de manjericão e azeitonas chilenas.',
  })
  description: string;

  @ApiProperty({
    example: 'https://cdn.accon.app/1720563617011004015296862215356-1080p.jpg',
  })
  image: string;

  @ApiProperty({ example: 106.9 })
  value: number;
}
