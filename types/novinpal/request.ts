import { BaseRequestOptions } from "../base/request";

export interface NovinpalRequestOptions extends BaseRequestOptions {
  // driver: "NOVINPAL";
  api_key: string;
  order_id: string;
  mobile?: string;
  card_number?: string;
}

export interface NovinpalRequestPaymentOptions {
  api_key: string;
  amount: number;
  return_url: string;
  order_id: string;
  card_number?: string;
  mobile?: string;
  description?: string;
}

export interface NovinpalRequestResponse {
  refId: string;
  status: number;
  errorCode: number;
  errorDescription: string;
}

export interface NovinpalRequestResponseExtraData {
  refId: number;
  url: string;
}

export interface NovinpalRequestErrorData {
  id: string;
  code: number;
  message: string;
  errors: { [key: string]: string[] };
}
