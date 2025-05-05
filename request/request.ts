import { NovinpalRequestOptions } from "./novinpal.request";
import { ZarinpalRequestOptions } from "./zarinpal.request";
import { ZibalRequestOptions } from "./zibal.request";

export interface BaseRequestOptions {
  amount: number;
  callbackUrl: string;
  sandbox?: boolean;
  description?: string;
}

export type RequestOptions = ZarinpalRequestOptions | ZibalRequestOptions | NovinpalRequestOptions;

export interface BaseRequestResponse {
  success: boolean;
  code?: number;
  message?: string;
  data?: unknown;
  raw?: unknown;
}

export interface RequestError {
  code: number;
  message?: string;
}
