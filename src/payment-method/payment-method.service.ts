import { Injectable } from '@nestjs/common';

export interface PaymentMethod {
  id: number;
  type: string;
  name: string;
  available: boolean;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 1, type: 'credit_card', name: 'Cartão de Crédito', available: true },
  { id: 2, type: 'cash_on_delivery', name: 'Pagamento na Entrega', available: true },
  { id: 3, type: 'pix', name: 'PIX', available: true },
  { id: 4, type: 'voucher', name: 'Voucher', available: false },
  { id: 5, type: 'points_exchange', name: 'Troca de Pontos', available: false },
];

@Injectable()
export class PaymentMethodService {
  findAll(): PaymentMethod[] {
    return PAYMENT_METHODS;
  }
}
