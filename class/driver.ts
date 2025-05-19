import {
  NovinpalRequestOptions,
  NovinpalRequestPaymentOptions,
  NovinpalRequestResponse,
  NovinpalRequestResponseExtraData,
} from "../request/novinpal.request";
import { BaseRequestResponse } from "../request/request";
import {
  ZarinpalRequestOptions,
  ZarinpalRequestPaymentOptions,
  ZarinpalRequestResponse,
  ZarinpalRequestResponseExtraData,
} from "../request/zarinpal.request";
import { ZibalRequestOptions, ZibalRequestResponse, ZibalRequestResponseExtraData } from "../request/zibal.request";
import { ZibalRequestPaymentOptions } from "../request/zibal.request";

export abstract class BasicDriver {
  abstract getRequestBody(
    options: ZarinpalRequestOptions | ZibalRequestOptions | NovinpalRequestOptions,
  ): ZarinpalRequestPaymentOptions | ZibalRequestPaymentOptions | NovinpalRequestPaymentOptions;

  abstract getRequestResponse(
    response: ZarinpalRequestResponse | ZibalRequestResponse | NovinpalRequestResponse,
    sandbox: boolean,
  ): BaseRequestResponse<ZarinpalRequestResponseExtraData | ZibalRequestResponseExtraData | NovinpalRequestResponseExtraData>;
}
