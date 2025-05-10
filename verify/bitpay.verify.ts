import { BaseVerifyOptions } from "./verify";

export interface BitpayVerifyOptions extends BaseVerifyOptions {
  driver: "BITPAY";
  api: string;
  trans_id: number;
  id_get: number;
}

export interface BitpayVerifyPaymentOptions {
  api: string;
  trans_id: number;
  id_get: number;
  json: number;
}

export interface BitpayVerifyPaymentResponse {
  status: number;
  amount: number;
  cardNum: string;
  factorId?: number;
}

export interface BitpayVerifyPaymentResponseExtraData {
  amount: number;
  cardNum: string;
  factorId?: number;
}
