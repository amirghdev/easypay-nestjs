import { ZarinpalRequestOptions, ZarinpalRequestResponseExtraData } from "../zarinpal/request";
import { ZibalRequestOptions, ZibalRequestResponseExtraData } from "../zibal/request";
import { NovinpalRequestOptions, NovinpalRequestResponseExtraData } from "../novinpal/request";
import { Driver } from "./general";
import { Payment4RequestOptions, Payment4RequestResponseExtraData } from "../payment4/request";

export interface BaseRequestOptions {
  amount: number;
  callbackUrl: string;
  sandbox?: boolean;
  description?: string;
}

export type RequestOptions = {
  driver: Driver;
  options: ZarinpalRequestOptions | ZibalRequestOptions | NovinpalRequestOptions | Payment4RequestOptions;
};

export interface BaseRequestResponse<T extends RequestData> {
  success: boolean;
  code?: number;
  message?: string;
  data?: T;
  raw?: unknown;
}

export interface RequestError {
  code: number;
  message?: string;
}

export type RequestData =
  | ZarinpalRequestResponseExtraData
  | ZibalRequestResponseExtraData
  | NovinpalRequestResponseExtraData
  | Payment4RequestResponseExtraData;
