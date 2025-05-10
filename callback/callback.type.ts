export type GatewayCallback = ZarinpalGatewayCallback | ZibalGatewayCallback | NovinpalGatewayCallback | BitpayGatewayCallback;

export interface ZarinpalGatewayCallback {
  port: "ZARINPAL";
  Authority: string;
  Status: "OK" | "NOK";
}

export interface ZibalGatewayCallback {
  port: "ZIBAL";
  success: 0 | 1;
  trackId: number;
  orderId?: number;
  status: number;
}

export interface NovinpalGatewayCallback {
  port: "NOVINPAL";
  success: 0 | 1;
  refId: number;
  code: number | string;
  invoiceNumber: number;
  amount: number;
}

export interface BitpayGatewayCallback {
  port: "BITPAY";
  trans_id: number;
  id_get: number;
}
