import { Payment4Currency, Payment4Language } from "./base";

export interface Payment4RequestOptions {
  sandBox: boolean;
  currency: Payment4Currency;
  amount: number;
  callbackUrl: string;
  callbackParams: CallbackParams;
  webhookUrl?: string;
  webhookParams?: WebhookParams;
  language: Payment4Language;
  apiKey: string;
}

export interface CallbackParams {
  [key: string]: string;
}

export interface WebhookParams {
  [key: string]: string;
}

export interface Payment4RequestResponse {
  id: number;
  paymentUid: string;
  paymentUrl: string;
}

export interface Payment4RequestResponseExtraData {
  id: number;
  paymentUid: string;
  url: string;
}

export interface Payment4RequestError {
  status: boolean;
  message: string;
  errorCode: 1001 | 1002 | 1003 | 1004 | 1005 | 1011 | 1012 | 1013;
}
