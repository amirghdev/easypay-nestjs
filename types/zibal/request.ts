import { BaseRequestOptions } from "../base/request";

export interface ZibalRequestOptions extends BaseRequestOptions {
  driver: "ZIBAL";
  orderId?: number;
  mobile?: number;
  allowedCards?: string[];
  ledgerId?: string;
  nationalCode?: string;
  checkMobileWithCard?: boolean;
  sandbox?: boolean;
  merchant: string;
}

export interface ZibalRequestPaymentOptions {
  merchant: string;
  amount: number;
  callbackUrl: string;
  description?: string;
  orderId?: number;
  mobile?: number;
  allowedCards?: string[];
  ledgerId?: string;
  nationalCode?: string;
  checkMobileWithCard?: boolean;
}

export interface ZibalRequestResponse {
  trackId: string;
  result: number;
  message: string;
}

export interface ZibalRequestResponseExtraData {
  trackId: string;
  url: string;
}
