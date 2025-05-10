import { BitpayRequestOptions } from "request/bitpay.request";
import { NovinpalRequestOptions, NovinpalRequestPaymentOptions, NovinpalRequestResponse } from "../request/novinpal.request";
import { BaseRequestResponse } from "../request/request";
import { ZarinpalRequestOptions, ZarinpalRequestPaymentOptions, ZarinpalRequestResponse } from "../request/zarinpal.request";
import { ZibalRequestOptions, ZibalRequestResponse } from "../request/zibal.request";
import { ZibalRequestPaymentOptions } from "../request/zibal.request";

export abstract class BasicDriver {
  abstract getRequestBody(
    options: ZarinpalRequestOptions | ZibalRequestOptions | NovinpalRequestOptions | BitpayRequestOptions,
  ): ZarinpalRequestPaymentOptions | ZibalRequestPaymentOptions | NovinpalRequestPaymentOptions;

  abstract getRequestResponse(
    response: ZarinpalRequestResponse | ZibalRequestResponse | NovinpalRequestResponse,
    sandbox: boolean,
  ): BaseRequestResponse;
}
