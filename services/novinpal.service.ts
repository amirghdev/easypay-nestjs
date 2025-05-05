import { Injectable } from "@nestjs/common";
import { BasicDriver } from "../class/driver";
import { UrlService } from "./url.service";
import {
  NovinpalRequestErrorData,
  NovinpalRequestOptions,
  NovinpalRequestPaymentOptions,
  NovinpalRequestResponse,
} from "../request/novinpal.request";
import {
  NovinpalVerifyOptions,
  NovinpalVerifyPaymentOptions,
  NovinpalVerifyPaymentResponse,
  NovinpalVerifyPaymentResponseError,
} from "../verify/novinpal.verify";
import { BaseResponse } from "../types/general.type";

@Injectable()
export class NovinpalService extends BasicDriver {
  constructor(private readonly urlService: UrlService) {
    super();
  }

  getRequestBody(options: NovinpalRequestOptions): NovinpalRequestPaymentOptions {
    return {
      api_key: options.api_key,
      amount: options.amount,
      return_url: options.callbackUrl,
      order_id: options.order_id,
      card_number: options.card_number,
      mobile: options.mobile,
      description: options.description,
    };
  }

  getRequestResponse(response: NovinpalRequestResponse, sandbox: boolean): BaseResponse {
    const isSuccess = response.status === 1;
    return {
      data: {
        url: this.urlService.getGatewayUrl("NOVINPAL", sandbox, response.refId),
        refId: response.refId,
      },
      success: isSuccess,
      code: response.status,
      message: isSuccess ? "success" : response.errorDescription,
    };
  }

  getRequestResponseError(response: NovinpalRequestErrorData): BaseResponse {
    return {
      success: false,
      code: response.code,
      message: response.message,
      raw: response,
      data: null,
    };
  }

  getVerifyBody(options: NovinpalVerifyOptions): NovinpalVerifyPaymentOptions {
    return {
      api_key: options.apiKey,
      ref_id: options.refId,
    };
  }

  getVerifyResponse(response: NovinpalVerifyPaymentResponse): BaseResponse {
    const isSuccess = response.status === 1;
    return {
      success: isSuccess,
      code: +response.status,
      message: isSuccess ? "success" : "failed",
      data: {
        paidAt: response.paidAt,
        cardNumber: response.cardNumber,
        amount: response.amount,
        refNumber: response.refNumber,
        description: response.description,
        orderId: response.orderId,
        verifiedBefore: response.verifiedBefore,
      },
    };
  }

  getVerifyResponseError(response: NovinpalVerifyPaymentResponseError): BaseResponse {
    return {
      success: false,
      code: response.status,
      message: response.errorDescription,
      raw: response,
      data: null,
    };
  }
}
