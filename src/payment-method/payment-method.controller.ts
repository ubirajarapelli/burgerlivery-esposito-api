import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PaymentMethodService, PaymentMethod } from './payment-method.service';

@ApiTags('payment-methods')
@ApiBearerAuth()
@Controller('payment-methods')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Lista os métodos de pagamento disponíveis' })
  @ApiOkResponse({
    description: 'Lista de métodos de pagamento retornada com sucesso',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          type: { type: 'string', example: 'credit_card' },
          name: { type: 'string', example: 'Cartão de Crédito' },
          available: { type: 'boolean', example: true },
        },
      },
    },
  })
  findAll(): PaymentMethod[] {
    return this.paymentMethodService.findAll();
  }
}
