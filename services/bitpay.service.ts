import { Injectable } from "@nestjs/common";
import { UrlService } from "./url.service";
import { BitpayRequestOptions, BitpayRequestPaymentOptions, BitpayRequestResponseErrorCodes } from "request/bitpay.request";
import { BaseResponse } from "types/general.type";
import { RequestError } from "request/request";
import { BitpayVerifyOptions, BitpayVerifyPaymentOptions, BitpayVerifyPaymentResponse } from "verify/bitpay.verify";

@Injectable()
export class BitpayService {
  constructor(private readonly urlService: UrlService) {}

  public getRequestBody(options: BitpayRequestOptions): BitpayRequestPaymentOptions {
    return {
      amount: options.amount,
      api: options.api,
      redirect: options.callbackUrl,
      name: options?.name || "",
      email: options?.email || "",
      factorId: options?.factorId || 0,
      description: options?.description || "",
    };
  }

  public getRequestResponse(response: number, sandbox: boolean): BaseResponse {
    const isSuccess = response > 0;
    const { code, message } = this.getRequestResponseError(response);
    return {
      success: isSuccess,
      code: isSuccess ? 100 : code,
      message: isSuccess ? "Payment request successful" : message,
      data: isSuccess
        ? {
            id_get: response,
            url: this.urlService.getGatewayUrl("BITPAY", sandbox, response.toString()),
          }
        : null,
    };
  }

  public getRequestResponseError(response: number): RequestError {
    return {
      code: response,
      message: BitpayRequestResponseErrorCodes[response],
    };
  }

  public getVerifyBody(options: BitpayVerifyOptions): BitpayVerifyPaymentOptions {
    return {
      api: options.api,
      trans_id: options.trans_id,
      id_get: options.id_get,
      json: 1,
    };
  }

  public getVerifyResponse(response: BitpayVerifyPaymentResponse): BaseResponse {
    console.log("verify response", response);

    const isSuccess = response.status === 1;
    const { code, message } = this.getVerifyResponseError(response.status);

    console.log("verify code", code);
    console.log("verify message", message);

    return {
      success: isSuccess,
      code: isSuccess ? response.status : code,
      message: isSuccess ? "Payment verification successful" : message,
      data: isSuccess
        ? {
            amount: response.amount,
            cardNum: response.cardNum,
            factorId: response.factorId,
          }
        : null,
    };
  }

  public getVerifyResponseError(response: number): RequestError {
    console.log("verify response error", response);
    return {
      code: response,
      message: BitpayRequestResponseErrorCodes[response],
    };
  }
}
