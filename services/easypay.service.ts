import { Injectable } from "@nestjs/common";
import { BaseRequestResponse, RequestOptions, RequestData } from "../types/base/request";
import { BaseVerifyResponse, VerifyData, VerifyOptions } from "../types/base/verify";
import { BaseInquiryResponse, InquiryData, InquiryOptions } from "../types/base/inquiry";
import { BasePaymentStrategy } from "../types/payment.strategy";
import { ZarinpalRequestOptions, ZarinpalRequestResponseExtraData } from "../types/zarinpal";
import { NovinpalRequestOptions, NovinpalRequestResponseExtraData } from "../types/novinpal";
import { ZibalRequestOptions, ZibalRequestResponseExtraData } from "../types/zibal";
import { ZarinpalVerifyOptions, ZarinpalVerifyPaymentResponseExtraData } from "../types/zarinpal/verify";
import { NovinpalVerifyOptions, NovinpalVerifyPaymentResponseExtraData } from "../types/novinpal/verify";
import { ZibalVerifyOptions, ZibalVerifyPaymentResponseExtraData } from "../types/zibal/verify";
import { ZibalInquiryOptions } from "../types/zibal/inquiry";
import { ZarinpalInquiryOptions } from "../types/zarinpal/inquiry";
import { ZarinpalInquiryResponseExtraData } from "../types/zarinpal/inquiry";
import { ZibalInquiryResponseExtraData } from "../types/zibal/inquiry";
import { ZarinpalStrategy } from "../strategies/zarinpal.strategy";
import { ZibalStrategy } from "../strategies/zibal.strategy";
import { NovinpalStrategy } from "../strategies/novinpal.strategy";
import { Driver } from "../types/base/general";
import { Payment4RequestResponseExtraData } from "../types/payment4/request";
import { Payment4RequestOptions } from "../types/payment4/request";
import { Payment4Strategy } from "../strategies/payment4.strategy";
import { Payment4VerifyOptions, Payment4VerifyResponseExtraData } from "../types/payment4/verify";

@Injectable()
export class EasypayService {
  private strategy: BasePaymentStrategy<any, any, any>;

  public request(options: { driver: "ZARINPAL"; options: ZarinpalRequestOptions }): Promise<BaseRequestResponse<ZarinpalRequestResponseExtraData>>;
  public request(options: { driver: "ZIBAL"; options: ZibalRequestOptions }): Promise<BaseRequestResponse<ZibalRequestResponseExtraData>>;
  public request(options: { driver: "NOVINPAL"; options: NovinpalRequestOptions }): Promise<BaseRequestResponse<NovinpalRequestResponseExtraData>>;
  public request(options: { driver: "PAYMENT4"; options: Payment4RequestOptions }): Promise<BaseRequestResponse<Payment4RequestResponseExtraData>>;
  async request<T extends RequestData>(options: RequestOptions): Promise<BaseRequestResponse<T>> {
    this.setStrategyBasedOnDriver(options.driver);
    return this.strategy.request(options);
  }

  public verify(options: { driver: "ZARINPAL"; options: ZarinpalVerifyOptions }): Promise<BaseVerifyResponse<ZarinpalVerifyPaymentResponseExtraData>>;
  public verify(options: { driver: "ZIBAL"; options: ZibalVerifyOptions }): Promise<BaseVerifyResponse<ZibalVerifyPaymentResponseExtraData>>;
  public verify(options: { driver: "NOVINPAL"; options: NovinpalVerifyOptions }): Promise<BaseVerifyResponse<NovinpalVerifyPaymentResponseExtraData>>;
  public verify(options: { driver: "PAYMENT4"; options: Payment4VerifyOptions }): Promise<BaseVerifyResponse<Payment4VerifyResponseExtraData>>;
  async verify<T extends VerifyData>(options: VerifyOptions): Promise<BaseVerifyResponse<T>> {
    this.setStrategyBasedOnDriver(options.driver);
    return this.strategy.verify(options);
  }

  public inquiry(options: { driver: "ZARINPAL"; options: ZarinpalInquiryOptions }): Promise<BaseInquiryResponse<ZarinpalInquiryResponseExtraData>>;
  public inquiry(options: { driver: "ZIBAL"; options: ZibalInquiryOptions }): Promise<BaseInquiryResponse<ZibalInquiryResponseExtraData>>;
  async inquiry<T extends InquiryData>(options: InquiryOptions): Promise<BaseInquiryResponse<T>> {
    this.setStrategyBasedOnDriver(options.driver);
    return this.strategy.inquiry(options);
  }

  private setStrategyBasedOnDriver(driver: Driver) {
    switch (driver) {
      case "ZARINPAL":
        this.strategy = new ZarinpalStrategy();
        break;
      case "ZIBAL":
        this.strategy = new ZibalStrategy();
        break;
      case "NOVINPAL":
        this.strategy = new NovinpalStrategy();
        break;
      case "PAYMENT4":
        this.strategy = new Payment4Strategy();
        break;
    }
  }
}
