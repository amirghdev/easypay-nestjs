import { BaseRequestOptions } from "../base/request";

export interface ZarinpalRequestOptions extends BaseRequestOptions {
  // driver: "ZARINPAL";
  metadata?: {
    mobile: string;
    email: string;
  };
  merchantId: string;
  orderId?: string;
}

export interface ZarinpalRequestResponse {
  data: ZarinpalRequestResponseData;
  errors: ZarinpalRequestResponseError;
}

export interface ZarinpalRequestResponseData {
  authority: string;
  fee: number;
  fee_type: string;
  code: number;
  message: string;
}

export interface ZarinpalRequestResponseExtraData {
  fee: number;
  fee_type: string;
  authority: string;
  url: string;
}

export interface ZarinpalRequestResponseError {
  message: string;
  code: number;
  validations: [];
}

export interface ZarinpalRequestPaymentOptions {
  metadata?: {
    mobile: string;
    email: string;
  };
  amount: number;
  callback_url: string;
  description?: string;
  merchant_id: string;
}
