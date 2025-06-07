export type GatewayCallback = ZarinpalGatewayCallback | ZibalGatewayCallback | NovinpalGatewayCallback | Payment4GatewayCallback;

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

export interface Payment4GatewayCallback {
  port: "PAYMENT4";
  paymentUid: string;
  paymentStatus: "SUCCESS" | "ACCEPTABLE" | "MISMATCH" | "EXPIRED";
}
