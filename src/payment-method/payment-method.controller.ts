import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PaymentMethodService } from './payment-method.service';
import type { PaymentMethod, PixResponse } from './payment-method.service';
import { PixDto } from './dto/pix.dto';

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

  @UseGuards(AuthGuard('jwt'))
  @Post('pix')
  @ApiOperation({ summary: 'Gera o código PIX copia e cola (simulação)' })
  @ApiOkResponse({
    description: 'Código PIX gerado com sucesso',
    schema: {
      type: 'object',
      properties: {
        copyPaste: {
          type: 'string',
          example: '00020126330014BR.GOV.BCB.PIX...',
        },
        amount: { type: 'number', example: 49.9 },
        transactionId: { type: 'string', example: 'PIX1713200000000' },
      },
    },
  })
  generatePix(@Body() pixDto: PixDto): PixResponse {
    return this.paymentMethodService.generatePix(pixDto);
  }
}
