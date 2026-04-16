import { Injectable } from '@nestjs/common';
import { payload } from 'pix-payload';
import * as QRCode from 'qrcode';
import { PixDto } from './dto/pix.dto';

export interface PaymentMethod {
  id: number;
  type: string;
  name: string;
  available: boolean;
}

export interface PixResponse {
  copyPaste: string;
  qrCode: string;
  amount: number;
  transactionId: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 1, type: 'credit_card', name: 'Cartão de Crédito', available: true },
  {
    id: 2,
    type: 'cash_on_delivery',
    name: 'Pagamento na Entrega',
    available: true,
  },
  { id: 3, type: 'pix', name: 'PIX', available: true },
  { id: 4, type: 'voucher', name: 'Voucher', available: false },
  { id: 5, type: 'points_exchange', name: 'Troca de Pontos', available: false },
];

// Dados simulados da loja (projeto acadêmico)
const PIX_CONFIG = {
  key: '11999999999', // chave PIX simulada (telefone)
  name: 'Pizzalivery',
  city: 'Sao Paulo',
};

@Injectable()
export class PaymentMethodService {
  findAll(): PaymentMethod[] {
    return PAYMENT_METHODS;
  }

  async generatePix(dto: PixDto): Promise<PixResponse> {
    const transactionId = dto.transactionId ?? `PIX${Date.now()}`;

    const copyPaste = payload({
      key: PIX_CONFIG.key,
      name: PIX_CONFIG.name,
      city: PIX_CONFIG.city,
      amount: dto.amount,
      transactionId,
    });

    // PNG: lossless, ideal para QR Code (sem artefatos nas bordas preto/branco)
    const qrCode = await QRCode.toDataURL(copyPaste, { type: 'image/png' });

    return {
      copyPaste,
      qrCode,
      amount: dto.amount,
      transactionId,
    };
  }
}
