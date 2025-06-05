import { Injectable } from "@nestjs/common";
import { BaseRequestResponse, RequestOptions, RequestData } from "../types/base/request";
import { BaseVerifyResponse, VerifyData, VerifyOptions } from "../types/base/verify";
import { BaseInquiryResponse, InquiryData, InquiryOptions } from "../types/base/inquiry";
import { BasePaymentStrategy } from "../types/payment.strategy";
import { ZarinpalRequestOptions, ZarinpalRequestResponseExtraData } from "../types/zarinpal/request";
import { NovinpalRequestOptions, NovinpalRequestResponseExtraData } from "../types/novinpal/request";
import { ZibalRequestOptions, ZibalRequestResponseExtraData } from "../types/zibal/request";
import { ZarinpalVerifyOptions, ZarinpalVerifyPaymentResponseExtraData } from "../types/zarinpal/verify";
import { NovinpalVerifyOptions, NovinpalVerifyPaymentResponseExtraData } from "../types/novinpal/verify";
import { ZibalVerifyOptions, ZibalVerifyPaymentResponseExtraData } from "../types/zibal/verify";
import { ZibalInquiryOptions } from "../types/zibal/inquiry";
import { ZarinpalInquiryOptions } from "../types/zarinpal/inquiry";
import { ZarinpalInquiryResponseExtraData } from "../types/zarinpal/inquiry";
import { ZibalInquiryResponseExtraData } from "../types/zibal/inquiry";

@Injectable()
export class EasypayService {
  private strategy: BasePaymentStrategy<any, any, any>;

  public setStrategy<T extends RequestData, V extends VerifyData, I extends InquiryData>(strategy: BasePaymentStrategy<T, V, I>) {
    this.strategy = strategy;
  }

  public request<T extends ZarinpalRequestResponseExtraData>(
    options: ZarinpalRequestOptions,
  ): Promise<BaseRequestResponse<ZarinpalRequestResponseExtraData>>;

  public request<T extends ZibalRequestResponseExtraData>(options: ZibalRequestOptions): Promise<BaseRequestResponse<ZibalRequestResponseExtraData>>;

  public request<T extends NovinpalRequestResponseExtraData>(
    options: NovinpalRequestOptions,
  ): Promise<BaseRequestResponse<NovinpalRequestResponseExtraData>>;

  async request<T extends RequestData>(options: RequestOptions): Promise<BaseRequestResponse<T>> {
    return this.strategy.request(options);
  }

  public verify<T extends ZarinpalVerifyPaymentResponseExtraData>(
    options: ZarinpalVerifyOptions,
  ): Promise<BaseVerifyResponse<ZarinpalVerifyPaymentResponseExtraData>>;

  public verify<T extends ZibalVerifyPaymentResponseExtraData>(
    options: ZibalVerifyOptions,
  ): Promise<BaseVerifyResponse<ZibalVerifyPaymentResponseExtraData>>;

  public verify<T extends NovinpalVerifyPaymentResponseExtraData>(
    options: NovinpalVerifyOptions,
  ): Promise<BaseVerifyResponse<NovinpalVerifyPaymentResponseExtraData>>;

  async verify<T extends VerifyData>(options: VerifyOptions): Promise<BaseVerifyResponse<T>> {
    return this.strategy.verify(options);
  }

  public inquiry<T extends ZarinpalInquiryResponseExtraData>(
    options: ZarinpalInquiryOptions,
  ): Promise<BaseInquiryResponse<ZarinpalInquiryResponseExtraData>>;

  public inquiry<T extends ZibalInquiryResponseExtraData>(options: ZibalInquiryOptions): Promise<BaseInquiryResponse<ZibalInquiryResponseExtraData>>;

  async inquiry<T extends InquiryData>(options: InquiryOptions): Promise<BaseInquiryResponse<T>> {
    return this.strategy.inquiry(options);
  }
}
