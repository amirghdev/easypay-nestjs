import { BaseVerifyOptions } from "../base/verify";
import { ZarinpalRequestResponseError } from "./request";

export interface ZarinpalVerifyOptions extends BaseVerifyOptions {
  driver: "ZARINPAL";
  authority: string;
  merchantId: string;
  amount: number;
}

export interface ZarinpalVerifyPaymentOptions {
  merchant_id: string;
  authority: string;
  amount: number;
}

export interface ZarinpalVerifyPaymentResponse {
  data: ZarinpalVerifyPaymentResponseData;
  errors: ZarinpalRequestResponseError;
}

export interface ZarinpalVerifyPaymentResponseData {
  wages: any;
  code: number;
  message: string;
  card_hash: string;
  card_pan: string;
  ref_id: number;
  fee_type: string;
  fee: number;
  shaparak_fee: number;
  order_id: any;
}

export interface ZarinpalVerifyPaymentResponseExtraData {
  fee: number;
  fee_type: string;
  card_hash: string;
  card_pan: string;
  ref_id: number;
}
