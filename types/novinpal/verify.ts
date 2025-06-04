import { BaseVerifyOptions } from "../base/verify";

export interface NovinpalVerifyOptions extends BaseVerifyOptions {
  driver: "NOVINPAL";
  apiKey: string;
  refId: string;
}

export interface NovinpalVerifyPaymentOptions {
  api_key: string;
  ref_id: string;
}

export interface NovinpalVerifyPaymentResponse {
  paidAt?: Date;
  cardNumber: number;
  status?: 1 | 0 | -1 | -2;
  amount: number;
  refNumber?: number;
  refId: number;
  description?: string;
  orderId?: number;
  verifiedBefore?: boolean;
}

export interface NovinpalVerifyPaymentResponseExtraData extends NovinpalVerifyPaymentResponse {
  paidAt?: Date;
  cardNumber: number;
  amount: number;
  refNumber?: number;
  refId: number;
  description?: string;
  orderId?: number;
  verifiedBefore?: boolean;
}

export interface NovinpalVerifyPaymentResponseError {
  status: 1 | 0 | -1 | -2;
  identification: string;
  errorCode: string;
  errorDescription: string;
}
