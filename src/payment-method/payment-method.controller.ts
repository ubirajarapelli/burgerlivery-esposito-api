import {
  Controller,
  Get,
  Post,
  Body,
  MessageEvent,
  Param,
  ParseIntPipe,
  Query,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiQuery,
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
        qrCode: {
          type: 'string',
          example: 'data:image/png;base64,iVBORw0KGgo...',
          description:
            'QR Code em base64 PNG, pronto para usar em <img src="..." />',
        },
        amount: { type: 'number', example: 49.9 },
        transactionId: { type: 'string', example: 'PIX1713200000000' },
      },
    },
  })
  async generatePix(@Body() pixDto: PixDto): Promise<PixResponse> {
    return this.paymentMethodService.generatePix(pixDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Sse('pix/status/:transactionId')
  @ApiOperation({
    summary: 'SSE: aguarda confirmação do pagamento PIX (simulação em 2 min)',
  })
  @ApiQuery({
    name: 'orderId',
    type: Number,
    required: true,
    description: 'ID do pedido a ser atualizado',
  })
  pixStatus(
    @Param('transactionId') transactionId: string,
    @Query('orderId', ParseIntPipe) orderId: number,
  ): Observable<MessageEvent> {
    return this.paymentMethodService.watchPixPayment(transactionId, orderId);
  }
}
