import { BaseVerifyOptions } from "./verify";

export interface ZibalVerifyOptions extends BaseVerifyOptions {
  driver: "ZIBAL";
  trackId: number;
  merchant: string;
}

export interface ZibalVerifyPaymentOptions {
  merchant: string;
  trackId: number;
}

export interface ZibalVerifyPaymentResponse {
  paidAt?: Date;
  cardNumber?: string;
  status?: string;
  amount?: number;
  refNumber?: number;
  description?: string;
  orderId?: number;
  result: number;
  message: string;
}

export interface ZibalVerifyPaymentResponseExtraData {
  paidAt?: Date;
  cardNumber?: string;
  status?: string;
  amount?: number;
  refNumber?: number;
  description?: string;
  orderId?: number;
  message?: string;
}
