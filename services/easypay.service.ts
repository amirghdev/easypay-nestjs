import { Injectable } from "@nestjs/common";
import { BaseRequestResponse, RequestOptions, RequestData } from "../types/base/request";
import { BaseVerifyResponse, VerifyData, VerifyOptions } from "../types/base/verify";
import { BaseInquiryResponse, InquiryData, InquiryOptions } from "../types/base/inquiry";
import { BasePaymentStrategy } from "../types/payment.strategy";

@Injectable()
export class EasypayService {
  private strategy: BasePaymentStrategy<any, any, any>;

  public setStrategy<T extends RequestData, V extends VerifyData, I extends InquiryData>(strategy: BasePaymentStrategy<T, V, I>) {
    this.strategy = strategy;
  }

  async request<T extends RequestData>(options: RequestOptions): Promise<BaseRequestResponse<T>> {
    return this.strategy.request(options);
  }

  async verify<T extends VerifyData>(options: VerifyOptions): Promise<BaseVerifyResponse<T>> {
    return this.strategy.verify(options);
  }

  async inquiry<T extends InquiryData>(options: InquiryOptions): Promise<BaseInquiryResponse<T>> {
    return this.strategy.inquiry(options);
  }
}
