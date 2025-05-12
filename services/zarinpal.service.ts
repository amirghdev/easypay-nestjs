import { BaseResponse } from "../types/general.type";
import { ZarinpalVerifyOptions, ZarinpalVerifyPaymentOptions, ZarinpalVerifyPaymentResponse } from "../verify/zarinpal.verify";
import { Injectable } from "@nestjs/common";
import { ZarinpalRequestOptions, ZarinpalRequestPaymentOptions, ZarinpalRequestResponse } from "../request/zarinpal.request";
import { BasicDriver } from "../class/driver";
import { UrlService } from "./url.service";
import { RequestError } from "../request/request";
import { ZarinpalInquiryPaymentOptions, ZarinpalInquiryResponse } from "inquiry/zarinpal.inquiry";
import { ZarinpalInquiryOptions } from "inquiry";

@Injectable()
export class ZarinpalService extends BasicDriver {
  constructor(private readonly urlService: UrlService) {
    super();
  }

  getRequestBody(options: ZarinpalRequestOptions): ZarinpalRequestPaymentOptions {
    return {
      merchant_id: options.merchantId,
      amount: options.amount,
      callback_url: options.callbackUrl,
      description: options.description,
      metadata: options.metadata,
    };
  }

  getRequestResponse(response: ZarinpalRequestResponse, sandbox: boolean): BaseResponse {
    return {
      code: response.data.code,
      message: response.data.message,
      success: true,
      data: {
        authority: response.data.authority,
        fee: response.data.fee,
        fee_type: response.data.fee_type,
        url: this.urlService.getGatewayUrl("ZARINPAL", sandbox, response.data.authority),
      },
    };
  }

  getRequestResponseError(response: ZarinpalRequestResponse): RequestError {
    return {
      code: response?.errors?.code,
      message: response?.errors?.message,
    };
  }

  getVerifyBody(options: ZarinpalVerifyOptions): ZarinpalVerifyPaymentOptions {
    return {
      merchant_id: options.merchantId.toString(),
      authority: options.authority,
      amount: options.amount,
    };
  }

  getVerifyResponse(response: ZarinpalVerifyPaymentResponse): BaseResponse {
    return {
      code: response.data.code,
      message: response.data.message,
      success: true,
      data: {
        fee: response.data.fee,
        fee_type: response.data.fee_type,
        card_hash: response.data.card_hash,
        card_pan: response.data.card_pan,
        ref_id: response.data.ref_id,
      },
    };
  }

  getVerifyResponseError(response: ZarinpalVerifyPaymentResponse): RequestError {
    return {
      code: response?.errors?.code,
      message: response?.errors?.message,
    };
  }

  getInquiryBody(options: ZarinpalInquiryOptions): ZarinpalInquiryPaymentOptions {
    return {
      merchant_id: options.merchant_id.toString(),
      authority: options.authority.toString(),
    };
  }

  getInquiryResponse(response: ZarinpalInquiryResponse): BaseResponse {
    return {
      code: response.data.code,
      message: response.data.message,
      success: true,
      data: { status: response.data.status },
    };
  }
}
