declare module 'pix-payload' {
  interface PixPayloadProps {
    key: string;
    name: string;
    city: string;
    amount?: number;
    transactionId?: string;
  }

  export function payload(props: PixPayloadProps): string;
}
