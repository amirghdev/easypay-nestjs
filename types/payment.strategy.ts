import { BaseRequestResponse, RequestData } from "../request/request";
import { VerifyData } from "../verify/verify";
import { BaseInquiryResponse, InquiryData, InquiryOptions } from "../inquiry/inquiry";
import { RequestOptions } from "../request/request";
import { BaseVerifyResponse } from "../verify/verify";
import { VerifyOptions } from "../verify/verify";

export interface BasePaymentStrategy<T extends RequestData, V extends VerifyData, I extends InquiryData> {
  requestPayment(options: RequestOptions): Promise<BaseRequestResponse<T>>;
  verifyPayment(options: VerifyOptions): Promise<BaseVerifyResponse<V>>;
  inquiryPayment?(options: InquiryOptions): Promise<BaseInquiryResponse<I>>;
  API_URLS?: {
    sandbox: string;
    production: string;
  };
  GATEWAY_URLS?: {
    sandbox: string;
    production: string;
  };
}
