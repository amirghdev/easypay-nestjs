import { Injectable } from "@nestjs/common";
import { ZibalRequestOptions, ZibalRequestPaymentOptions, ZibalRequestResponse, ZibalRequestResponseExtraData } from "../request/zibal.request";
import { BasicDriver } from "../class/driver";
import {
  ZibalVerifyOptions,
  ZibalVerifyPaymentOptions,
  ZibalVerifyPaymentResponse,
  ZibalVerifyPaymentResponseExtraData,
} from "../verify/zibal.verify";
import { UrlService } from "./url.service";
import { BaseResponse } from "../types/general.type";
import { ZibalInquiryPaymentOptions, ZibalInquiryResponse, ZibalInquiryResponseExtraData } from "inquiry/zibal.inquiry";
import { ZibalInquiryOptions } from "inquiry/zibal.inquiry";
import { BaseRequestResponse } from "request/request";
import { BaseVerifyResponse } from "verify/verify";
import { BaseInquiryResponse } from "inquiry/inquiry";

@Injectable()
export class ZibalService extends BasicDriver {
  constructor(private readonly urlService: UrlService) {
    super();
  }

  SANDBOX_URL = "https://gateway.zibal.ir/v1/request";
  PRODUCTION_URL = "https://gateway.zibal.ir/v1/request";

  public getRequestBody(options: ZibalRequestOptions): ZibalRequestPaymentOptions {
    if (options.sandbox) {
      //? this is the default merchant for zibal in sandbox mode
      options.merchant = "zibal";
    }
    return {
      merchant: options.merchant,
      amount: options.amount,
      callbackUrl: options.callbackUrl,
      description: options.description,
      orderId: options.orderId,
      mobile: options.mobile,
      allowedCards: options.allowedCards,
      ledgerId: options.ledgerId,
      nationalCode: options.nationalCode,
      checkMobileWithCard: options.checkMobileWithCard,
    };
  }

  public getRequestResponse(response: ZibalRequestResponse, sandbox: boolean): BaseRequestResponse<ZibalRequestResponseExtraData> {
    const isSuccess = response.result === 100;
    return {
      code: response.result,
      success: isSuccess,
      message: response.message,
      data: isSuccess
        ? {
            trackId: response.trackId,
            url: this.urlService.getGatewayUrl("ZIBAL", sandbox, response.trackId),
          }
        : null,
    };
  }

  public getVerifyBody(options: ZibalVerifyOptions): ZibalVerifyPaymentOptions {
    return {
      merchant: options.merchant.toString(),
      trackId: +options.trackId,
    };
  }

  public getVerifyResponse(response: ZibalVerifyPaymentResponse): BaseVerifyResponse<ZibalVerifyPaymentResponseExtraData> {
    const isSuccess = response.result === 100 || response.result === 201;
    return {
      code: response.result,
      success: isSuccess,
      message: response.message,
      data: isSuccess
        ? {
            paidAt: response.paidAt,
            cardNumber: response.cardNumber,
            status: response.status,
            amount: response.amount,
            refNumber: response.refNumber,
            description: response.description,
            orderId: response.orderId,
          }
        : null,
    };
  }

  public getInquiryBody(options: ZibalInquiryOptions): ZibalInquiryPaymentOptions {
    return {
      merchant: options.merchant.toString(),
      trackId: +options.trackId,
    };
  }

  public getInquiryResponse(response: ZibalInquiryResponse): BaseInquiryResponse<ZibalInquiryResponseExtraData> {
    return {
      code: response.result,
      success: response.result === 100,
      message: response.message,
      data: {
        createdAt: response.createdAt,
        paidAt: response.paidAt,
        verifiedAt: response.verifiedAt,
        cardNumber: response.cardNumber,
        status: response.status,
        amount: response.amount,
        refNumber: response.refNumber,
        description: response.description,
        orderId: response.orderId,
        wage: response.wage,
      },
    };
  }
}
