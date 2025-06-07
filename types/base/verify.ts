import { ZarinpalVerifyOptions, ZarinpalVerifyPaymentResponseExtraData } from "../zarinpal/verify";
import { ZibalVerifyOptions, ZibalVerifyPaymentResponseExtraData } from "../zibal/verify";
import { NovinpalVerifyOptions, NovinpalVerifyPaymentResponseExtraData } from "../novinpal/verify";
import { Driver } from "./general";
import { Payment4VerifyOptions, Payment4VerifyResponseExtraData } from "../payment4/verify";

export interface BaseVerifyOptions {
  sandbox?: boolean;
}

export type VerifyOptions = {
  driver: Driver;
  options: ZarinpalVerifyOptions | ZibalVerifyOptions | NovinpalVerifyOptions | Payment4VerifyOptions;
};

export interface BaseVerifyResponse<T extends VerifyData> {
  code?: number;
  message?: string;
  success: boolean;
  data?: T;
  raw?: unknown;
}

export type VerifyData =
  | ZarinpalVerifyPaymentResponseExtraData
  | ZibalVerifyPaymentResponseExtraData
  | NovinpalVerifyPaymentResponseExtraData
  | Payment4VerifyResponseExtraData;
