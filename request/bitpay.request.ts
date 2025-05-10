import { BaseRequestOptions } from "./request";

export interface BitpayRequestOptions extends BaseRequestOptions {
  driver: "BITPAY";
  api: string;
  name?: string;
  email?: string;
  factorId?: number;
}

export interface BitpayRequestPaymentOptions {
  api: string;
  amount: number;
  redirect: string;
  name?: string;
  email?: string;
  factorId?: number;
  description?: string;
}

export interface BitpayRequestResponseExtraData {
  id_get: number;
}

export const BitpayRequestResponseErrorCodes = {
  "-1": "The sent API is not compatible with the API type defined in bitpay",
  "-2": "The amount value is not numeric or is less than 1000 Rials",
  "-3": "The redirect value is null",
  "-4": "No gateway exists with your submitted information or it is in pending state",
  "-5": "Error connecting to the gateway, please try again",
};
