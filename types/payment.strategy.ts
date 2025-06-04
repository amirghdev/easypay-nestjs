import { BaseRequestResponse, RequestData } from "../types/base/request";
import { VerifyData } from "../types/base/verify";
import { BaseInquiryResponse, InquiryData, InquiryOptions } from "../types/base/inquiry";
import { RequestOptions } from "../types/base/request";
import { BaseVerifyResponse } from "../types/base/verify";
import { VerifyOptions } from "../types/base/verify";

export interface BasePaymentStrategy<T extends RequestData, V extends VerifyData, I extends InquiryData = never> {
  request(options: RequestOptions): Promise<BaseRequestResponse<T>>;
  verify(options: VerifyOptions): Promise<BaseVerifyResponse<V>>;
  inquiry?(options: InquiryOptions): Promise<BaseInquiryResponse<I>>;
  API_URLS?: {
    sandbox: string;
    production: string;
  };
  GATEWAY_URLS?: {
    sandbox: string;
    production: string;
  };
}
